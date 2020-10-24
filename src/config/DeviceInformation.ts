import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class DeviceInformation extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('deviceinformation/config.xml', {}, 'config');
    }
}