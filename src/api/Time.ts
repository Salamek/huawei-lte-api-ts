import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Time extends ApiGroup {
    timeout(): Promise<GetResponseType> {
        return this._connection.get('time/timeout');
    }
}