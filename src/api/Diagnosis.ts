import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class Diagnosis extends ApiGroup {
    traceRouteResult(): Promise<GetResponseType> {
        return this._connection.get('diagnosis/tracerouteresult');
    }

    diagnosePing(): Promise<GetResponseType> {
        return this._connection.get('diagnosis/diagnose_ping');
    }

    setDiagnosePing(host: string, timeout: number = 4000): Promise<SetResponseType> {
        return this._connection.postSet('diagnosis/diagnose_ping', {
            Host: host,
            Timeout: timeout,
        });
    }

    diagnoseTraceroute(): Promise<GetResponseType> {
        return this._connection.get('diagnosis/diagnose_traceroute');
    }

    setDiagnoseTraceroute(host: string, timeout: number = 4000, maxHopCount: number = 30): Promise<SetResponseType> {
        return this._connection.postSet('diagnosis/diagnose_ping', {
            Host: host,
            MaxHopCount: maxHopCount,
            Timeout: timeout,
        });
    }

    timeReboot(): Promise<GetResponseType> {
        return this._connection.get('diagnosis/time_reboot');
    }
}


