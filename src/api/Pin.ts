import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class Pin extends ApiGroup {
    status(): Promise<GetResponseType> {
        return this._connection.get('pin/status');
    }

    simlock(): Promise<GetResponseType> {
        return this._connection.get('pin/simlock');
    }

    savePin(): Promise<GetResponseType> {
        return this._connection.get('pin/save-pin');
    }

    /**
     * Change pin
     * @param operate_type number Operation type to perform (default is `0`).
            0 - verify PIN
            1 - enable PIN verification
            2 - disable PIN verification
            3 - set new PIN
            4 - use of the PUK code
     * @param currentPin Current PIN number (default is `null`).
     * @param newPin New PIN number to set (default is `null`).
     * @param pukCode PUK code to use in case it is required by the device (default is `null`).
     */
    operate(operate_type: number = 0, currentPin?: number, newPin?: number, pukCode?: number) : Promise<SetResponseType> {
        return this._connection.postSet('pin/operate', {
            'OperateType': operate_type,
            'CurrentPin': currentPin,
            'NewPin': newPin,
            'PukCode': pukCode
        });
    }
}
    
