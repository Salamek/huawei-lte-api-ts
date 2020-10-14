
import { ApiGroup } from '../ApiGroup';
import { AntennaTypeEnum } from '../enums/device';
import { GetResponseType, SetResponseType } from '../types';

export class Device extends ApiGroup {
    information(): Promise<GetResponseType> {
        return this._connection.get('device/information')
    }

    autorunVersion(): Promise<GetResponseType> {
        return this._connection.get('device/autorun-version')
    }

    deviceFeatureSwitch(): Promise<GetResponseType> {
        return this._connection.get('device/device-feature-switch')
    }

    basicInformation(): Promise<GetResponseType> {
        return this._connection.get('device/basic_information')
    }

    basicinformation(): Promise<GetResponseType> {
        return this._connection.get('device/basicinformation')
    }

    usbTetheringSwitch(): Promise<GetResponseType> {
        return this._connection.get('device/usb-tethering-switch')
    }

    bootTime(): Promise<GetResponseType> {
        return this._connection.get('device/boot_time')
    }

    setControl(control: number = 4): Promise<SetResponseType> {
        return this._connection.postSet('device/control', {
            'Control': control
        });
    }

    signal(): Promise<GetResponseType> {
        return this._connection.get('device/signal')
    }

    control(control: number): Promise<SetResponseType> {
        return this._connection.postSet('device/control', {
            'Control': control
        });
    }

    reboot(): Promise<SetResponseType> {
        return this.control(1)
    }

    antennaStatus(): Promise<GetResponseType> {
        return this._connection.get('device/antenna_status')
    }

    getAntennaSettings(): Promise<GetResponseType> {
        return this._connection.get('device/antenna_settings')
    }

    setAntennaSettings(antennaType: AntennaTypeEnum = AntennaTypeEnum.AUTO): Promise<SetResponseType> {
        return this._connection.postSet('device/antenna_settings', {
            'antenna_type': antennaType.toString()
        });
    }

    antennaType(): Promise<GetResponseType> {
        return this._connection.get('device/antenna_type')
    }

    antennaSetType(): Promise<GetResponseType> {
        return this._connection.get('device/antenna_set_type')
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    logsetting(): Promise<GetResponseType> {
        return this._connection.get('device/logsetting')
    }
}



