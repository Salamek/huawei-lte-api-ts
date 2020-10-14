
import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Global extends ApiGroup{
    moduleSwitch(): Promise<GetResponseType> {
        return this._connection.get('global/module-switch');
    }

    /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
    */
    storageGetItem(): Promise<GetResponseType> {
        return this._connection.get('global/storage-getitem');
    }
}