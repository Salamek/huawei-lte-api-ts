import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';



export class Ussd extends ApiGroup {
    prepaidussd(): Promise<GetResponseType> {
        return this._connection.get('ussd/prepaidussd.xml', {}, 'config');
    }

    postpaidussd(): Promise<GetResponseType> {
        return this._connection.get('ussd/postpaidussd.xml', {}, 'config');
    }
}
    
