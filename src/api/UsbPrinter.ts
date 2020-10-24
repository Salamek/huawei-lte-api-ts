import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class UsbPrinter extends ApiGroup {
    printerlist(): Promise<GetResponseType> {
        return this._connection.get('usbprinter/printerlist');
    }
}
