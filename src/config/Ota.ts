import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Ota extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('ota/config.xml', {}, 'config');
    }
}

