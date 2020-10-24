import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class WebServer extends ApiGroup {
    publickey(): Promise<GetResponseType> {
        return this._connection.get('webserver/publickey');
    }

    token(): Promise<GetResponseType> {
        return this._connection.get('webserver/token');
    }

    whiteListSwitch(): Promise<GetResponseType> {
        return this._connection.get('webserver/white_list_switch');
    }

    /**
     * Get session token info
     */
    sesTokInfo(): Promise<GetResponseType> {
        return this._connection.get('webserver/SesTokInfo');
    }
}
    
