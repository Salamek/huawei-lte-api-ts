import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class WebSd extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('websd/config.xml', {}, 'config');
    }
}

