import { ApiGroup } from '../ApiGroup';
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
}


