import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class Monitoring extends ApiGroup {
    convergedStatus(): Promise<GetResponseType> {
        return this._connection.get('monitoring/converged-status');
    }
        
    status(): Promise<GetResponseType> {
        return this._connection.get('monitoring/status');
    }

    checkNotifications(): Promise<GetResponseType> {
        return this._connection.get('monitoring/check-notifications');
    }

    trafficStatistics(): Promise<GetResponseType> {
        return this._connection.get('monitoring/traffic-statistics');
    }

    startDate(): Promise<GetResponseType> {
        return this._connection.get('monitoring/start_date');
    }

    /**
     * Sets network usage alarm for LTE
     * @param startDay number of day when monitoring starts
     * @param dataLimit Maximal data limit as string eg.: 1000MB or 1GB and so on
     * @param monthThreshold Alarm threshold in % as int number eg.: 90
     */
    setStartDate(startDay: number, dataLimit: string, monthThreshold: number): Promise<SetResponseType> {
        return this._connection.postSet('monitoring/start_date', {
            'StartDay': startDay,
            'DataLimit': dataLimit,
            'MonthThreshold': monthThreshold,
            'SetMonthData': 1
        });
    }

    startDateWlan(): Promise<GetResponseType> {
        return this._connection.get('monitoring/start_date_wlan');
    }

    /**
     * Sets network usage alarm for WLAN
     * @param startDay number of day when monitoring starts
     * @param dataLimit Maximal data limit as string eg.: 1000MB or 1GB and so on
     * @param monthThreshold Alarm threshold in % as int number eg.: 90
     */
    setStartDateWlan(startDay: number, dataLimit: string, monthThreshold: number): Promise<SetResponseType> {
        return this._connection.postSet('monitoring/start_date_wlan', {
            'StartDay': startDay,
            'DataLimit': dataLimit,
            'MonthThreshold': monthThreshold,
            'SettingEnable': 1  //!FIXME
        });
    }

    monthStatistics(): Promise<GetResponseType> {
        return this._connection.get('monitoring/month_statistics');
    }

    monthStatisticsWlan(): Promise<GetResponseType> {
        return this._connection.get('monitoring/month_statistics_wlan');
    }

    setClearTraffic(): Promise<SetResponseType> {
        return this._connection.postSet('monitoring/clear-traffic', {
            'ClearTraffic': 1
        });
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage, probably not implemented by Huawei
     */
    wifiMonthSetting(): Promise<GetResponseType> {
        return this._connection.get('monitoring/wifi-month-setting');
    }
}
    
