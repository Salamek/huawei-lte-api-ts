import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class VSim extends ApiGroup {
    operateswitchVsim(): Promise<GetResponseType> {
        return this._connection.get('vsim/operateswitch-vsim');
    }
}
    
