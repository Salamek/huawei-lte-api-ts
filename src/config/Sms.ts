import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Sms extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('sms/config.xml', {}, 'config');
    }
}

