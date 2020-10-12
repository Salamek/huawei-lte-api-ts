import { ApiGroup } from '../ApiGroup';

export class DialUp extends ApiGroup {
    /**
     * Get current LTE modem toggle state
     */
    mobileDataswitch(): Promise<any> /* -> GetResponseType*/ {
        return this._connection.get('dialup/mobile-dataswitch')
    }

    connection(): Promise<any> /* -> GetResponseType*/ {
        return this._connection.get('dialup/connection')
    }


    dialupFeatureSwitch(): Promise<any> /* -> GetResponseType*/ {
        return this._connection.get('dialup/dialup-feature-switch')
    }


    profiles(): Promise<any> /* -> GetResponseType*/ {
        return this._connection.get('dialup/profiles')
    }


    autoApn() : Promise<any>/* -> GetResponseType*/ {
        return this._connection.get('dialup/auto-apn')
    }


    dial(): Promise<any> /*-> SetResponseType*/ {
        return this._connection.postSet('dialup/dial', {
            'Action': 1
        });
    }

    /**
     * Toggle LTE modem state
     * @param dataswitch: number 0 to disable LTE modem, 1 to enable LTE modem
     */
    setMobileDataswitch(dataswitch: number = 0): Promise<any>/* -> SetResponseType*/ {
        return this._connection.postSet('dialup/mobile-dataswitch', {
            'dataswitch': dataswitch
        })
    }
}


