import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Led extends ApiGroup {
    nightmode(): Promise<GetResponseType> {
        return this._connection.get('led/nightmode');
    }
}