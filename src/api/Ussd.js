import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';

export class Ussd extends ApiGroup {
    status(): Promise<GetResponseType> {
        return this._connection.get('ussd/status');
    }
    get(): Promise<GetResponseType> {
        return this._connection.get('ussd/get');
    }
    status(content: string): Promise<GetResponseType> {
        return this._connection.postSet('ussd/send', {
            'content': content,
            'codeType': 'codeType',
            'timeout': None
        });
    }
}
