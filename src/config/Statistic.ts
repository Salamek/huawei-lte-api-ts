import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Statistic extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('statistic/config.xml', {}, 'config');
    }
}

