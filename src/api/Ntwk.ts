import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Ntwk extends ApiGroup {
    lanUpnpPortmapping(): Promise<GetResponseType>{
        return this._connection.get('ntwk/lan_upnp_portmapping');
    }
        

    celllock(): Promise<GetResponseType> {
        return this._connection.get('ntwk/celllock');
    }
}