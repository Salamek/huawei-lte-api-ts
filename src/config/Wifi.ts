import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Wifi extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('wifi/config.xml', {}, 'config');
    }

    configure(): Promise<GetResponseType> {
        return this._connection.get('wifi/configure.xml', {}, 'config');
    }

    country_channel(): Promise<GetResponseType> {
        return this._connection.get('wifi/countryChannel.xml', {}, 'config');
    }

    channel_auto_match_hardware(): Promise<GetResponseType> {
        return this._connection.get('wifi/channelAutoMatchHardware.xml', {}, 'config');
    }
}

