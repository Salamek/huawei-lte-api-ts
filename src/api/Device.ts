
import { ApiGroup } from '../ApiGroup';
import { AntennaTypeEnum } from '../enums/device';


export class Device extends ApiGroup {
    information(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/information')
    }


    autorun_version(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/autorun-version')
    }


    device_feature_switch(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/device-feature-switch')
    }


    basic_information(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/basic_information')
    }


    basicinformation(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/basicinformation')
    }


    usb_tethering_switch(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/usb-tethering-switch')
    }


    boot_time(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/boot_time')
    }


    set_control(control: number = 4): Promise<any>  /*-> SetResponseType:*/ {
        return this._connection.postSet('device/control', {
            'Control': control
        });
    }


    signal(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/signal')
    }


    control(control: number): Promise<any> /* -> SetResponseType*/ {
        return this._connection.postSet('device/control', {
            'Control': control
        });
    }


    reboot(): Promise<any>  /*-> SetResponseType*/ {
        return this.control(1)
    }


    antenna_status(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/antenna_status')
    }


    get_antenna_settings(): Promise<any>  /*-> GetResponseType*/ {
        return this._connection.get('device/antenna_settings')
    }


    set_antenna_settings(antennaType: AntennaTypeEnum = AntennaTypeEnum.AUTO): Promise<any> /* -> SetResponseType*/ {
        return this._connection.postSet('device/antenna_settings', {
            'antenna_type': antennaType.toString()
        });
    }


    antenna_type(): Promise<any> /*-> GetResponseType*/ {
        return this._connection.get('device/antenna_type')
    }


    antenna_set_type(): Promise<any> /*-> GetResponseType*/ {
        return this._connection.get('device/antenna_set_type')
    }


    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    logsetting(): Promise<any> /*-> GetResponseType*/ {
        return this._connection.get('device/logsetting')
    }
}



