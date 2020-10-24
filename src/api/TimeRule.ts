import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class TimeRule extends ApiGroup {
    timerule(): Promise<GetResponseType> {
        return this._connection.get('time/timerule');
    }
}