import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Cradle extends ApiGroup {
    statusInfo(): Promise<GetResponseType> {
        return this._connection.get('cradle/status-info');
    }

    featureSwitch(): Promise<GetResponseType> {
        return this._connection.get('cradle/feature-switch');
    }

    basicInfo(): Promise<GetResponseType> {
        return this._connection.get('cradle/basic-info');
    }

    factoryMac(): Promise<GetResponseType> {
        return this._connection.get('cradle/factory-mac');
    }

    macInfo(): Promise<GetResponseType> {
        return this._connection.get('cradle/mac-info');
    }
}


