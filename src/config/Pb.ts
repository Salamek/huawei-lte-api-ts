import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Pb extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('pb/config.xml', {}, 'config');
    }
}

