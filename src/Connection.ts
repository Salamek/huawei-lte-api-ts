import { User } from './api/User';
import { ResponseCodeEnum } from './enums/client';
import { Session } from './Session';
import { Parser, Builder } from "xml2js";
import { join } from 'path';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';
import { GetResponseType, SetResponseType } from './types'

import {
    ResponseErrorException,
    ResponseErrorLoginRequiredException,
    ResponseErrorNotSupportedException,
    ResponseErrorSystemBusyException,
    ResponseErrorLoginCsrfException,
    RequestFormatException
} from './exceptions';


/*
def _try_or_reload_and_retry(fn: Callable[..., T]) -> Callable[..., T]:
    def wrapped(*args: Any, **kw: Any) -> T:
        try:
            return fn(*args, **kw)
        except ResponseErrorLoginCsrfException:
            args[0].reload()
            return fn(*args, **kw)

    return wrapped
*/

export class Connection {
    requestVerificationTokens: string[] = [];
    url: string;
    session: Session;
    ready: Promise<void>;

    constructor(url: string, axios_config: AxiosRequestConfig) {
        this.session = new Session(axios_config);

        if (!url.endsWith('/')) {
            url += '/';
        }

        const urlInfo = new URL(url);
        const username = decodeURIComponent(urlInfo.username);
        const password = decodeURIComponent(urlInfo.password);
        urlInfo.username = '';
        urlInfo.password = '';

        this.url = urlInfo.toString();

        this.ready = new Promise((resolve, reject) => {
            this.initializeCsrfTokensAndSession().then(() => {
                // Login code
                if (username) {
                    // Username is specified, we need to login
                    const user = new User(this, username, password);
                    user.login(true).then(() => {
                        resolve();
                    }).catch(reject);
                } else {
                    resolve();
                }
            }).catch(reject);
        });
    }

    reload(): void {
        this.initializeCsrfTokensAndSession();
    }

    private createRequestXml(data: Record<string, unknown>): string {
        /* Force empty tags instead of selfclosing tags */
        const builder = new Builder(<any>{
            renderOpts: {
                pretty: false,
                indent: ' ',
                newline: '\n',
                allowEmpty: true
            }
        });
        return builder.buildObject({
            request: data
        });
    }

    private async processResponseXml(response: AxiosResponse): Promise<Record<string, unknown>> {
        // In some cases unsupported methods, e.g. in config namespace,
        // respond with a redirect to the home page, which may not
        // parse as XML (even though it's labeled XHTML). Try to detect
        // such cases, and return a generated "not supported" error
        // instead of letting the XML parse error pass through.

        const xml = response.data;

        if (!xml) {
            return {}
        }

        const parser = new Parser({explicitArray : false});

        try {
            return await parser.parseStringPromise(xml)
        } catch (error) {
            if (response.request.responseURL != response.request.url) {
                return {
                    'error': {
                        'code': ResponseCodeEnum.ERROR_SYSTEM_NO_SUPPORT,
                        'message': ''
                    }
                }
            }
            throw error
        }
    }

    private checkResponseStatus(data: Record<string, unknown>): string | Record<string, unknown> {
        const errorCodeToMessage: { [key in keyof typeof ResponseCodeEnum]?: string } = {
            [ResponseCodeEnum.ERROR_SYSTEM_BUSY]: 'System busy',
            [ResponseCodeEnum.ERROR_SYSTEM_NO_RIGHTS]: 'No rights (needs login)',
            [ResponseCodeEnum.ERROR_SYSTEM_NO_SUPPORT]: 'No support',
            [ResponseCodeEnum.ERROR_SYSTEM_UNKNOWN]: 'Unknown',
            [ResponseCodeEnum.ERROR_SYSTEM_CSRF]: 'Session error',
            [ResponseCodeEnum.ERROR_FORMAT_ERROR]: 'Request format error',
        }

        const errorCodeToException: { [key in keyof typeof ResponseCodeEnum]?: typeof ResponseErrorException } = {
            [ResponseCodeEnum.ERROR_SYSTEM_BUSY]: ResponseErrorSystemBusyException,
            [ResponseCodeEnum.ERROR_SYSTEM_NO_RIGHTS]: ResponseErrorLoginRequiredException,
            [ResponseCodeEnum.ERROR_SYSTEM_NO_SUPPORT]: ResponseErrorNotSupportedException,
            [ResponseCodeEnum.ERROR_SYSTEM_UNKNOWN]: ResponseErrorException,
            [ResponseCodeEnum.ERROR_SYSTEM_CSRF]: ResponseErrorLoginCsrfException,
            [ResponseCodeEnum.ERROR_FORMAT_ERROR]: RequestFormatException,
        }

        if ('error' in data) {
            const errorData = <{error: {code: string, message: string}}>data;
            let message: string;
            const errorCode = parseInt(errorData.error.code);
            if (!errorData.error.message) {
                message = errorCodeToMessage[errorCode] || 'Unknown';
            } else {
                message = errorData.error.message;
            }

            const exception = errorCodeToException[errorCode] || ResponseErrorException;

            throw new exception(`${errorCode}: ${message}`, errorCode);
        }

        if ('response' in data) {
            return <string | Record<string, unknown>>data['response'];
        } else {
            return data || {};
        }
    }

    private async initializeCsrfTokensAndSession(): Promise<void> {
        // Reset
        this.requestVerificationTokens = [];
        // # Lets try to parse csrf_token from homepage html head meta[name="csrf_token"]
        const response = await this.session.get(this.url);
        const csrfRegex = new RegExp(/name="csrf_token"\s+content="(\S+)"/g);
        let regexResult;
        do {
            regexResult = csrfRegex.exec(response.data);
            if (regexResult) {
                this.requestVerificationTokens.push(regexResult[1]);
            }
        } while (regexResult);

        if (this.requestVerificationTokens.length == 0) {
            //If we did not find anything in HTML, lets try to ask API for it
            try {
                const token = await this.getToken();
                this.requestVerificationTokens.push(token);
            } catch (error) {
                if (!(error instanceof ResponseErrorNotSupportedException)) {
                    throw error;
                }
            }
        }
    }

    private buildFinalUrl(endpoint: string, prefix: string = 'api'): string {
        const url = new URL(join(prefix, endpoint), this.url);
        return url.toString();
    }

    postGet(endpoint: string, data: Record<string, unknown>, refreshCsrf: boolean = false, prefix: string = 'api'): Promise<GetResponseType> {
        return <Promise<GetResponseType>>this.post(endpoint, data, refreshCsrf, prefix);
    }

    postSet(endpoint: string, data: Record<string, unknown>, refreshCsrf: boolean = false, prefix: string = 'api'): Promise<SetResponseType> {
        return <Promise<SetResponseType>>this.post(endpoint, data, refreshCsrf, prefix);
    }

    private async getToken(): Promise<string> {
        try {
            const data = <{ [key: string]: string; }>await this.get('webserver/token');
            return data['token'];
        } catch (error) {
            if (error instanceof ResponseErrorNotSupportedException) {
                const data = <{ [key: string]: string; }>await this.get('webserver/SesTokInfo');
                return data['TokInfo'];
            } else {
                throw error;
            }
        }
    }

    //@_try_or_reload_and_retry
    async get(endpoint: string, parameters?: { [key: string]: string; }, prefix: string = 'api'): Promise<GetResponseType> {
        const headers: { [key: string]: string; } = {};
        if (this.requestVerificationTokens.length == 1) {
            headers['__RequestVerificationToken'] = this.requestVerificationTokens[0];
        }

        return <Promise<GetResponseType>>this.session.get(
            this.buildFinalUrl(endpoint, prefix),
            {
                params: parameters,
                headers: headers
            }
        ).then(async (response: AxiosResponse) => {
            const rawData = await this.processResponseXml(response);
            return this.checkResponseStatus(rawData);
        });
    }

    //@_try_or_reload_and_retry
    private async post(endpoint: string, data?: Record<string, unknown>, refreshCsrf: boolean = false, prefix: string = 'api'): Promise<unknown> {
        const headers: { [key: string]: string; } = {
            'Content-Type': 'application/xml'
        }

        if (this.requestVerificationTokens.length > 1) {
            headers['__RequestVerificationToken'] = <string>this.requestVerificationTokens.shift();
        } else if (this.requestVerificationTokens.length == 1) {
            headers['__RequestVerificationToken'] = this.requestVerificationTokens[0];
        }

        return this.session.post(
            this.buildFinalUrl(endpoint, prefix),
            (data ? this.createRequestXml(data) : ''),
            {
                headers: headers
            }
        ).then(async (response: AxiosResponse) => {
            const responseData = await this.processResponseXml(response).then((rawData: Record<string, unknown>) => {
                return this.checkResponseStatus(rawData);
            });

            if (refreshCsrf) {
                this.requestVerificationTokens = [];
            }

            if ('__requestverificationtokenone' in response.headers) {
                this.requestVerificationTokens.push(response.headers['__requestverificationtokenone']);
                if ('__requestverificationtokentwo' in response.headers) {
                    this.requestVerificationTokens.push(response.headers['__requestverificationtokentwo']);
                }
            } else if ('__requestverificationtoken' in response.headers) {
                this.requestVerificationTokens.push(response.headers['__requestverificationtoken']);
            }

            return responseData;
        });
    }

    async postFile(
        endpoint: string,
        files: { [key: string]: Blob; },
        data?: { [key: string]: string | Blob | number; },
        prefix: string = 'api'
    ): Promise<AxiosResponse> {
        const formData = new FormData();
        if (this.requestVerificationTokens.length > 0) {
            formData.append('csrf_token', this.requestVerificationTokens[0]);
        }

        Object.entries(files).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }

        return this.session.post(
            this.buildFinalUrl(endpoint, prefix),
            formData
        );
    }
}
