import { ApiGroup } from '../ApiGroup';
import { AuthModeEnum, IpType } from '../enums/dialup';
import { GetResponseType, SetResponseType } from '../types';

export class DialUp extends ApiGroup {
    /**
     * Get current LTE modem toggle state
     */
    mobileDataswitch(): Promise<GetResponseType> {
        return this._connection.get('dialup/mobile-dataswitch')
    }

    connection(): Promise<GetResponseType> {
        return this._connection.get('dialup/connection')
    }

    dialupFeatureSwitch(): Promise<GetResponseType> {
        return this._connection.get('dialup/dialup-feature-switch')
    }

    profiles(): Promise<GetResponseType> {
        return this._connection.get('dialup/profiles')
    }

    autoApn(): Promise<GetResponseType> {
        return this._connection.get('dialup/auto-apn')
    }

    dial(): Promise<SetResponseType> {
        return this._connection.postSet('dialup/dial', {
            'Action': 1
        });
    }

    /**
     * Toggle LTE modem state
     * @param dataswitch: number 0 to disable LTE modem, 1 to enable LTE modem
     */
    setMobileDataswitch(dataswitch: number = 0): Promise<SetResponseType> {
        return this._connection.postSet('dialup/mobile-dataswitch', {
            'dataswitch': dataswitch
        })
    }

    /**
     * @TODO requires is_encrypted=True for some modems
     * @param setDefault 
     * @returns 
     */
    setDefaultProfile(setDefault: number = 0): Promise<SetResponseType> {
        return this._connection.postSet('dialup/profiles', {
            'SetDefault': setDefault,
            'Delete': 0,
            'Modify': 0
        })
    }

    /**
     * @TODO requires is_encrypted=True for some modems
     * @param index 
     * @returns 
     */
    deleteProfile(index: number): Promise<SetResponseType> {
        return this._connection.postSet('dialup/profiles', {
            'SetDefault': 0,
            'Delete': index,
            'Modify': 0
        })
    }

    /**
     * @TODO requires is_encrypted=True for some modems
     * @param name 
     * @param username 
     * @param password 
     * @param apn 
     * @param dialupNumber 
     * @param authMode 
     * @param ipType 
     * @param isDefault 
     * @returns 
     */
    createProfile(
        name: string, 
        username?: string, 
        password?: string, 
        apn?: string, 
        dialupNumber?: string,
        authMode: AuthModeEnum = AuthModeEnum.AUTO,
        ipType: IpType = IpType.IPV4_IPV6,
        isDefault: boolean = false
        ): Promise<SetResponseType> {
        return this._connection.postSet('dialup/profiles', {
            'SetDefault': isDefault ? 1 : 0,
            'Delete': 0,
            'Modify': 1,
            'Profile': {
                'Index': '',
                'IsValid': 1,
                'Name': name,
                'ApnIsStatic': apn ? 1 :0,
                'ApnName': apn,
                'DialupNum': dialupNumber,
                'Username': username,
                'Password': password,
                'AuthMode': authMode,
                'IpIsStatic': '',
                'IpAddress': '',
                'DnsIsStatic': '',
                'PrimaryDns': '',
                'SecondaryDns': '',
                'ReadOnly': '0',
                'iptype': ipType
            }
        })
    }
}


