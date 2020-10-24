import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class Syslog extends ApiGroup {
    querylog(): Promise<GetResponseType> {
        return this._connection.get('syslog/querylog');
    }

    clear(): Promise<SetResponseType> {
        return this._connection.postSet('syslog/processlog', {
            'command': 'clear',
        });
    }
}
    
