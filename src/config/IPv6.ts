import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class IPv6 extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('ipv6/config.xml', {}, 'config');
    }
}