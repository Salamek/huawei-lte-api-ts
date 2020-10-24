import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class PublicSysResources extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('public_sys-resources/config.xml', {}, 'usermanual');
    }
}