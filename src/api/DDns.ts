import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class DDns extends ApiGroup {
    getDdnsList(): Promise<GetResponseType> {
        return this._connection.get('ddns/ddns-list');
    }
        
    getStatus(): Promise<GetResponseType>{
        return this._connection.get('ddns/status');
    }
}
    