import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Global extends ApiGroup {
   languagelist(): Promise<GetResponseType> {
      return this._connection.get('global/languagelist.xml', {}, 'config');
   }

   config(): Promise<GetResponseType> {
      return this._connection.get('global/config.xml', {}, 'config');
   }

   netType(): Promise<GetResponseType> {
      return this._connection.get('global/net-type.xml', {}, 'config');
   }
}