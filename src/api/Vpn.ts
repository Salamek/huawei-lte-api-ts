import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Vpn extends ApiGroup {
    featureSwitch(): Promise<GetResponseType> {
        return this._connection.get('vpn/feature-switch');
    }

    brList(): Promise<GetResponseType> {
        return this._connection.get('vpn/br_list');
    }

    ipsecSettings(): Promise<GetResponseType> {
        return this._connection.get('vpn/ipsec_settings');
    }

    l2tpSettings(): Promise<GetResponseType> {
        return this._connection.get('vpn/l2tp_settings');
    }

    pptpSettings(): Promise<GetResponseType> {
        return this._connection.get('vpn/pptp_settings');
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    status(): Promise<GetResponseType> {
        return this._connection.get('vpn/status');
    }
}

    
