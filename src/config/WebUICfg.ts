import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class WebUICfg extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('webuicfg/config.xml', {}, 'config');
    }
}

