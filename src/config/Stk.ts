import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Stk extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('stk/config.xml', {}, 'config');
    }
}

