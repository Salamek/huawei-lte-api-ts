import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';
import { AuthModeEnum, WepEncryptModeEnum, WpaEncryptModeEnum } from '../enums/wlan';


export class WLan extends ApiGroup {
    wifiFeatureSwitch(): Promise<GetResponseType> {
        return this._connection.get('wlan/wifi-feature-switch');
    }

    stationInformation(): Promise<GetResponseType> {
        return this._connection.get('wlan/station-information');
    }

    basicSettings(): Promise<GetResponseType> {
        return this._connection.get('wlan/basic-settings');
    }

    setBasicSettings(ssid: string, hide: boolean = false, wifiRestart: boolean = false): Promise<SetResponseType> {
        return this._connection.postSet('wlan/basic-settings', {
            'WifiSsid': ssid,
            'WifiHide': hide,
            'WifiRestart': wifiRestart ? 1 : 0
        });
    }

    securitySettings(): Promise<GetResponseType> {
        return this._connection.get('wlan/security-settings');
    }

    setSecuritySettings(
        wpaPsk: string,
        wepKey: string = '',
        wpaEncryptionMode: WpaEncryptModeEnum = WpaEncryptModeEnum.MIX,
        wepEncryptionMode: WepEncryptModeEnum = WepEncryptModeEnum.WEP128,
        authMode: AuthModeEnum = AuthModeEnum.AUTO,
        wifiRestart: boolean = true
    ): Promise<SetResponseType> {
        return this._connection.postSet('wlan/security-settings', {
            'WifiAuthmode': authMode,
            'WifiWepKey1': wepKey,
            'WifiWpaencryptionmodes': wpaEncryptionMode,
            'WifiBasicencryptionmodes': wepEncryptionMode,
            'WifiWpapsk': wpaPsk,
            'WifiRestart': wifiRestart ? 1 : 0
        });
    }

    multiSecuritySettings(): Promise<GetResponseType> {
        return this._connection.get('wlan/multi-security-settings');
    }

    multiSecuritySettingsEx(): Promise<GetResponseType> {
        return this._connection.get('wlan/multi-security-settings-ex');
    }

    multiBasicSettings(): Promise<GetResponseType> {
        return this._connection.get('wlan/multi-basic-settings');
    }

    /**
     * 
     * @param clients list of dicts with format {'wifihostname': hostname,'WifiMacFilterMac': mac}
     */
    setMultiBasicSettings(clients: Array<string>): Promise<SetResponseType> {
        return this._connection.postSet('wlan/multi-basic-settings', {
            'Ssids': {
                'Ssid': clients
            },
            'WifiRestart': 1
        });
    }

    hostList(): Promise<GetResponseType> {
        // Make sure Hosts->Host is a list
        // It may be returned as a single dict if only one is associated,
        // as well as sometimes None.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hosts = <any>this._connection.get('wlan/host-list');
        if (!hosts['Hosts']) {
            hosts['Hosts'] = {};
        }


        if (!Object.prototype.hasOwnProperty.call(hosts['Hosts'], 'Host')) {
            hosts['Hosts']['Host'] = [];
        }

        const host = hosts['Hosts']['Host'];
        if (host instanceof Array) {
            hosts['Hosts']['Host'] = [host]
        }

        return host;
    }

    handoverSetting(): Promise<GetResponseType> {
        return this._connection.get('wlan/handover-setting');
    }

    /**
     * 
     * @param handover G3_PREFER = 0, WIFI_PREFER = 2
     */
    setHandoverSetting(handover: number): Promise<SetResponseType> {
        return this._connection.postSet('wlan/handover-setting', {
            'Handover': handover
        });
    }

    multiSwitchSettings(): Promise<GetResponseType> {
        return this._connection.get('wlan/multi-switch-settings');
    }

    multiMacfilterSettings(): Promise<GetResponseType> {
        return this._connection.get('wlan/multi-macfilter-settings');
    }

    /**
     * 
     * @param clients list of dicts with format {'wifihostname': hostname,'WifiMacFilterMac': mac}
     */
    setMultiMacfilterSettings(clients: Array<string>): Promise<SetResponseType> {
        return this._connection.postSet('wlan/multi-macfilter-settings', {
            'Ssids': {
                'Ssid': clients
            }
        });
    }

    multiMacfilterSettingsEx(): Promise<GetResponseType> {
        return this._connection.get('wlan/multi-macfilter-settings-ex');
    }

    macFilter(): Promise<GetResponseType> {
        return this._connection.get('wlan/mac-filter');
    }

    setMacFilter(hostname: string, mac: string): Promise<SetResponseType> {
        return this._connection.postSet('wlan/mac-filter', {
            'wifihostname': hostname,
            'WifiMacFilterMac': mac
        });
    }

    oledShowpassword(): Promise<GetResponseType> {
        return this._connection.get('wlan/oled-showpassword');
    }

    wps(): Promise<GetResponseType> {
        return this._connection.get('wlan/wps');
    }

    wpsAppin(): Promise<GetResponseType> {
        return this._connection.get('wlan/wps-appin');
    }

    wpsPbc(): Promise<GetResponseType> {
        return this._connection.get('wlan/wps-pbc');
    }

    wpsSwitch(): Promise<GetResponseType> {
        return this._connection.get('wlan/wps-switch');
    }

    statusSwitchSettings(): Promise<GetResponseType> {
        return this._connection.get('wlan/status-switch-settings');
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage, probably not implemented by Huawei
     */
    wifiprofile(): Promise<GetResponseType> {
        return this._connection.get('wlan/wifiprofile');
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage, probably not implemented by Huawei
     */
    wififrequence(): Promise<GetResponseType> {
        return this._connection.get('wlan/wififrequence');
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage, probably not implemented by Huawei
     */
    wifiscanresult(): Promise<GetResponseType> {
        return this._connection.get('wlan/wifiscanresult');
    }
}

