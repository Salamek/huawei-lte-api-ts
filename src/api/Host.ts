import { ApiGroup } from '../ApiGroup';
import { SetResponseType } from '../types';


export class Host extends ApiGroup{
    info(dateTime: Date, platform: string, userAgent: string, version: string): Promise<SetResponseType> {
        return this._connection.postSet('host/info', {
            'Time': dateTime.toUTCString(),
            'Timezone': `GMT${dateTime.getTimezoneOffset()}`,
            'Platform': platform,
            'PlatformVer': userAgent,
            'Navigator': version,
            'NavigatorVer': userAgent
        });
    }  
}
    
