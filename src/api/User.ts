import * as crypto from "crypto-js";

import { PasswordTypeEnum, LoginStateEnum, LoginErrorEnum } from '../enums/user';
import { ResponseEnum } from '../enums/client';
import { ApiGroup } from '../ApiGroup';
import { Connection } from '../Connection';


import {
    ResponseErrorException, 
    LoginErrorAlreadyLoginException, 
    LoginErrorUsernamePasswordModifyException, 
    LoginErrorUsernamePasswordOverrunException, 
    LoginErrorUsernamePasswordWrongException, 
    LoginErrorUsernameWrongException, 
    LoginErrorPasswordWrongException, 
    ResponseErrorNotSupportedException
} from '../exceptions';

export class User extends ApiGroup {
    private username: string = 'admin';
    private _password?: string;

    constructor(connection: Connection, username?: string, password?: string) {
        super(connection);
        this.username = username || 'admin';
        this._password = password;
    }

    delay(seconds: number): Promise<any> {
        return new Promise( resolve => setTimeout(resolve, seconds * 1000) );
    }

    private async attemptLogin(passwordType: PasswordTypeEnum=PasswordTypeEnum.BASE_64): Promise<boolean> {
        let password = '';
        if (this._password){
            if (passwordType == PasswordTypeEnum.SHA256) {
                const concentrated = [
                    this.username, 
                    crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(crypto.SHA256(this._password).toString())),
                    this._connection.requestVerificationTokens[0]
                ].join('');
                password = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(crypto.SHA256(concentrated).toString()))
            } else {
                password = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(this._password));
            }
        }

        return this._connection.postSet('user/login', {
            'Username': this.username,
            'Password': password,
            'password_type': passwordType.toString()
        }, true).then((response: any/*SetResponseType*/) => {
            return response.response == ResponseEnum.OK
        }).catch((error: any) => {
            if (error instanceof ResponseErrorException) {
                const errorCodeToMessage: { [key in keyof typeof LoginErrorEnum]?: string } = {
                    [LoginErrorEnum.USERNAME_WRONG]: 'Username wrong',
                    [LoginErrorEnum.PASSWORD_WRONG]: 'Password wrong',
                    [LoginErrorEnum.ALREADY_LOGIN]: 'Already login',
                    [LoginErrorEnum.USERNAME_PWD_WRONG]: 'Username and Password wrong',
                    [LoginErrorEnum.USERNAME_PWD_ORERRUN]: 'Password overrun',
                    [LoginErrorEnum.USERNAME_PWD_MODIFY]: 'Password modify'
                }
    
                const errorCodeToException: { [key in keyof typeof LoginErrorEnum]?: typeof ResponseErrorException } = {
                    [LoginErrorEnum.USERNAME_WRONG]: LoginErrorUsernameWrongException,
                    [LoginErrorEnum.PASSWORD_WRONG]: LoginErrorPasswordWrongException,
                    [LoginErrorEnum.ALREADY_LOGIN]: LoginErrorAlreadyLoginException,
                    [LoginErrorEnum.USERNAME_PWD_WRONG]: LoginErrorUsernamePasswordWrongException,
                    [LoginErrorEnum.USERNAME_PWD_ORERRUN]: LoginErrorUsernamePasswordOverrunException,
                    [LoginErrorEnum.USERNAME_PWD_MODIFY]: LoginErrorUsernamePasswordModifyException,
                }
    
                const message = errorCodeToMessage[error.code] || 'Unknown';
                const exception = errorCodeToException[error.code] || ResponseErrorException;

                throw new exception(`${error.code}: ${message}`, error.code);
            } else {
                throw error;
            }
        })
    }

    async login(forceNewLogin: boolean = false): Promise<boolean> {
        const tries: number = 5;

        let stateLogin;
        for (const i of Array.from(Array(tries).keys())) {
            try{
                stateLogin = await this.stateLogin();
            } catch (error) {
                if (error instanceof ResponseErrorNotSupportedException) {
                    return true;
                }
                // Some models reportedly close the connection if we attempt to access login state too soon after
                // setting up the session etc. In that case, retry a few times. The error is reported to be
                // ConnectionError: (
                //     'Connection aborted.', RemoteDisconnected('Remote end closed connection without response'))
                if (i == tries - 1) {
                    throw error;
                }
                await this.delay((i + 1) / 10);
            }
        }

        if (LoginStateEnum.LOGGED_IN == parseInt(stateLogin.response['State']) && !forceNewLogin){
            return true;
        }
        
        const passwordType = parseInt(stateLogin.response['password_type']);
        return this.attemptLogin(passwordType);
    }

    logout(): Promise<any>/*SetResponseType*/{
        return this._connection.get('user/logout');
    }

    stateLogin(): Promise<any> /*GetResponseType*/{
        return this._connection.get('user/state-login');
    }

    remind(): Promise<any> /*GetResponseType*/ {
        return this._connection.get('user/remind');
    }

    password(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/password');
    }
        

    pwd(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/pwd');
    }
        

    setRemind(remind_state: string): Promise<any> /*-> SetResponseType*/{
        return this._connection.postSet('user/remind', {
            'remindstate': remind_state
        });
    }
        

    authenticationLogin(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/authentication_login');
    }
        

    challengeLogin(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/challenge_login');
    }
        

    hilinkLogin(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/hilink_login');
    }
        

    historyLogin(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/history-login');
    }
        

    heartbeat(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/heartbeat');
    }
        

    webFeatureSwitch(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/web-feature-switch');
    }
        
    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    inputEvent(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/input_event')
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    screenState(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/screen_state')
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    session(): Promise<any> /*-> GetResponseType*/{
        return this._connection.get('user/session')
    }

      
}


    
