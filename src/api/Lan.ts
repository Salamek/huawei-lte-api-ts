import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Lan extends ApiGroup{
    hostInfo(): Promise<GetResponseType> {
        return this._connection.get('lan/HostInfo');
    }
}