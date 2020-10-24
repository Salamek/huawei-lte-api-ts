import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Update extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('update/config.xml', {}, 'config');
    }
}

