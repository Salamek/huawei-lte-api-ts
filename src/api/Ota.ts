import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Ota extends ApiGroup {
    status(): Promise<GetResponseType> {
        return this._connection.get('ota/status');
    }
}