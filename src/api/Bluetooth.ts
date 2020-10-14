import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';

export class Bluetooth extends ApiGroup {
    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    settings(): Promise<GetResponseType> {
        return this._connection.get('bluetooth/settings');
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    scan(): Promise<GetResponseType> {
        return this._connection.get('bluetooth/scan');
    }
}
