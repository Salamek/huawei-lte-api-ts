import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class UPnp extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('upnp/config.xml', {}, 'config');
    }
}
    
