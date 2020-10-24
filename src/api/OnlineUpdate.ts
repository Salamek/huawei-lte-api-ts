import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class OnlineUpdate extends ApiGroup {
    checkNewVersion(): Promise<GetResponseType> {
        return this._connection.get('online-update/check-new-version');
    }

    setCheckNewVersion(): Promise<SetResponseType> {
        return this._connection.postSet('online-update/check-new-version', {});
    }

    status(): Promise<GetResponseType> {
        return this._connection.get('online-update/status');
    }

    urlList(): Promise<GetResponseType> {
        return this._connection.get('online-update/url-list');
    }

    ackNewversion(): Promise<GetResponseType> {
        return this._connection.get('online-update/ack-newversion');
    }

    setAckNewversion(): Promise<SetResponseType> {
        return this._connection.postSet('online-update/ack-newversion', {
            'userAckNewVersion': 0
        });
    }

    /**
     * Invoking this method is known to cause some devices to reboot.
     */
    cancelDownloading(): Promise<GetResponseType> {
        return this._connection.get('online-update/cancel-downloading');
    }

    setCancelDownloading(): Promise<SetResponseType> {
        return this._connection.postSet('online-update/cancel-downloading', {});
    }

    upgradeMessagebox(): Promise<GetResponseType> {
        return this._connection.get('online-update/upgrade-messagebox');
    }

    setUpgradeMessagebox(messagebox: string): Promise<SetResponseType> {
        return this._connection.postSet('online-update/upgrade-messagebox', {
            'messagebox': messagebox
        });
    }

    configuration(): Promise<GetResponseType> {
        return this._connection.get('online-update/configuration');
    }

    autoupdateConfig(): Promise<GetResponseType> {
        return this._connection.get('online-update/autoupdate-config');
    }

    redirectCancel(): Promise<GetResponseType> {
        return this._connection.get('online-update/redirect_cancel');
    }

}
    