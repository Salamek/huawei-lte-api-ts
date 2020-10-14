import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class MLog extends ApiGroup {
    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    mobileLogger(): Promise<GetResponseType> {
        return this._connection.get('mlog/mobile-logger');
    }
}
