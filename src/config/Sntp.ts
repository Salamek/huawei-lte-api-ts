import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Sntp extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('sntp/config.xml', {}, 'config');
    }
}

