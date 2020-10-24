import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class FastBoot extends ApiGroup {
    config(): Promise<GetResponseType> {
        return this._connection.get('fastboot/config.xml', {}, 'config');
    }
}
