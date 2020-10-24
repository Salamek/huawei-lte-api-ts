import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class UsbStorage extends ApiGroup {
    fsstatus(): Promise<GetResponseType> {
        return this._connection.get('usbstorage/fsstatus');
    }

    usbaccount(): Promise<GetResponseType> {
        return this._connection.get('usbstorage/usbaccount');
    }
}
