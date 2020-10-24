import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Firewall extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('firewall/config.xml', {}, 'config');
    }
}

