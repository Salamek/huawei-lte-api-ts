import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class Net extends ApiGroup {
    currentPlmn(): Promise<GetResponseType> {
        return this._connection.get('net/current-plmn');
    }

    netMode(): Promise<GetResponseType> {
        return this._connection.get('net/net-mode');
    }

    setNetMode(lteband: string, networkband: string, networkmode: string): Promise<SetResponseType> {
        return this._connection.postSet('net/net-mode', {
            'NetworkMode': networkmode,
            'NetworkBand': networkband,
            'LTEBand': lteband
        });
    }

    network(): Promise<GetResponseType> {
        return this._connection.get('net/network');
    }

    register(): Promise<GetResponseType> {
        return this._connection.get('net/register');
    }

    /**
     * Sets network selection
     * @param mode "1": manual network selection, "0": auto
     * @param plmn Plmn code ("Numeric" value returned by net_mode_list()), "" for auto
     * @param rat "0": "2G", "2": "3G", "7": "4G" ("Rat" value returned by net_mode_list()), "" for auto
     */
    setRegister(mode: string, plmn: string, rat: string): Promise<SetResponseType> {
        return this._connection.postSet('net/register', {
            'Mode': mode,
            'Plmn': plmn,
            'Rat': rat
        });
    }

    netModeList(): Promise<GetResponseType> {
        return this._connection.get('net/net-mode-list');
    }

    /**
     * DoS
     */
    plmnList(): Promise<GetResponseType> {
        return this._connection.get('net/plmn-list');
    }

    netFeatureSwitch(): Promise<GetResponseType> {
        return this._connection.get('net/net-feature-switch');
    }

    cellInfo(): Promise<GetResponseType> {
        return this._connection.get('net/cell-info');
    }

    cspsState(): Promise<GetResponseType> {
        return this._connection.get('net/csps_state');
    }
}

