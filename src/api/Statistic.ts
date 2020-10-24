import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';


export class Statistic extends ApiGroup {
    featureRoamStatistic(): Promise<GetResponseType> {
        return this._connection.get('statistic/feature-roam-statistic');
    }
}
    
