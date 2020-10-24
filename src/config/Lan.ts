import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Lan extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('lan/config.xml', {}, 'config');
    }
}
    
