import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class PcAssistant extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('pcassistant/config.xml', {}, 'config');
    }

    updateautorun(): Promise<GetResponseType> {
        return this._connection.get('pcassistant/updateautorun.xml', {}, 'config');
    }
}

