import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Log extends ApiGroup {
    loginfo(): Promise<GetResponseType> {
        return this._connection.get('log/loginfo');
    }
}