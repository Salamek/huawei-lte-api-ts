import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Pincode extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('pincode/config.xml', {}, 'config');
    }
}
