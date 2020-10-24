import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Voice extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('voice/config.xml', {}, 'config');
    }

    country(): Promise<GetResponseType> {
        return this._connection.get('voice/country.xml', {}, 'config');
    }
}

