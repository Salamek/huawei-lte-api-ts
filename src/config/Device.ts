import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Device extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('device/config.xml', {}, 'config');
    }
}
    
