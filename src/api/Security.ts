import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class Security extends ApiGroup {
   bridgemode(): Promise<GetResponseType> {
      return this._connection.get('security/bridgemode');
   }

   getFirewallSwitch(): Promise<GetResponseType> {
      return this._connection.get('security/firewall-switch');
   }

   setFirewallSwitch(
      firewall: boolean = true,
      ipFilter: boolean = false,
      wanPingFilter: boolean = true,
      urlFilter: boolean = false,
      macFilter: boolean = false
   ): Promise<SetResponseType> {
      return this._connection.postSet('security/firewall-switch', {
         'FirewallMainSwitch': firewall ? 1 : 0,
         'FirewallIPFilterSwitch': ipFilter ? 1 : 0,
         'FirewallWanPortPingSwitch': wanPingFilter ? 1 : 0,
         'firewallurlfilterswitch': urlFilter ? 1 : 0,
         'firewallmacfilterswitch': macFilter ? 1 : 0
      });
   }

   macFilter(): Promise<GetResponseType> {
      return this._connection.get('security/mac-filter');
   }

   lanIpFilter(): Promise<GetResponseType> {
      return this._connection.get('security/lan-ip-filter');
   }

   virtualServers(): Promise<GetResponseType> {
      return this._connection.get('security/virtual-servers');
   }

   urlFilter(): Promise<GetResponseType> {
      return this._connection.get('security/url-filter');
   }

   upnp(): Promise<GetResponseType> {
      return this._connection.get('security/upnp');
   }

   setUpnp(enabled: boolean): Promise<SetResponseType> {
      return this._connection.postSet('security/upnp', {
         'UpnpStatus': enabled ? 1 : 0,
      });
   }

   dmz(): Promise<GetResponseType> {
      return this._connection.get('security/dmz');
   }

   setDmz(enabled: boolean, ipAddress: string): Promise<SetResponseType> {
      return this._connection.postSet('security/dmz', {
         'DmzStatus': enabled ? 1 : 0,
         'DmzIPAddress': ipAddress
      });
   }

   sip(): Promise<GetResponseType> {
      return this._connection.get('security/sip');
   }

   setSip(enabled: boolean, port: number): Promise<SetResponseType> {
      return this._connection.postSet('security/sip', {
         'SipStatus': enabled ? 1 : 0,
         'SipPort': port
      });
   }

   featureSwitch(): Promise<GetResponseType> {
      return this._connection.get('security/feature-switch');
   }

   nat(): Promise<GetResponseType> {
      return this._connection.get('security/nat');
   }

   specialApplications(): Promise<GetResponseType> {
      return this._connection.get('security/special-applications');
   }

   whiteLanIpFilter(): Promise<GetResponseType> {
      return this._connection.get('security/white-lan-ip-filter');
   }

   whiteUrlFilter(): Promise<GetResponseType> {
      return this._connection.get('security/white-url-filter');
   }

   /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage, probably not implemented by Huawei
    */
   acls(): Promise<GetResponseType> {
      return this._connection.get('security/acls');
   }

}


