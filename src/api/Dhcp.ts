import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Dhcp extends ApiGroup {
    settings(): Promise<GetResponseType> {
        return this._connection.get('dhcp/settings');
    }

    featureSwitch(): Promise<GetResponseType> {
        return this._connection.get('dhcp/feature-switch');
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    dhcpHostInfo(): Promise<GetResponseType> {
        return this._connection.get('dhcp/dhcp-host-info');
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    staticAddrInfo(): Promise<GetResponseType> {
        return this._connection.get('dhcp/static-addr-info');
    }
}