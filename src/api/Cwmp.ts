import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Cwmp extends ApiGroup {
    basicInfo(): Promise<GetResponseType> {
        return this._connection.get('cwmp/basic-info');
    }
}

