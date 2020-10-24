import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Redirection extends ApiGroup {
    homepage(): Promise<GetResponseType> {
        return this._connection.get('redirection/homepage');
    }
}
    
