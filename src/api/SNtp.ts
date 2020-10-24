import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class SNtp extends ApiGroup{
    getSettings(): Promise<GetResponseType> {
        return this._connection.get('sntp/settings');
    }

    sntpswitch(): Promise<GetResponseType> {
        return this._connection.get('sntp/sntpswitch');
    }

    serverinfo(): Promise<GetResponseType> {
        return this._connection.get('sntp/serverinfo');
    }

    timeinfo(): Promise<GetResponseType> {
        return this._connection.get('sntp/timeinfo');
    }
}
    
