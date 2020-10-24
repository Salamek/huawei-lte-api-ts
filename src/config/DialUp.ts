import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class DialUp extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('dialup/config.xml', {}, 'config');
    }

    connectmode(): Promise<GetResponseType> {
        return this._connection.get('dialup/connectmode.xml', {}, 'config');
    }

    profileswitch(): Promise<GetResponseType> {
        return this._connection.get('dialup/profileswitch.xml', {}, 'config');
    }

    lmtAutoModeDisconnect(): Promise<GetResponseType> {
        return this._connection.get('dialup/lmt_auto_mode_disconnect.xml', {}, 'config');
    }
}
