import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';
import { BoxTypeEnum, TextModeEnum, SaveModeEnum, SendTypeEnum, PriorityEnum } from '../enums/sms';


export class Sms extends ApiGroup {
   getCbsnewslist(): Promise<GetResponseType> {
      return this._connection.get('sms/get-cbsnewslist');
   }

   smsCount(): Promise<GetResponseType> {
      return this._connection.get('sms/sms-count');
   }

   splitinfoSms(): Promise<GetResponseType> {
      return this._connection.get('sms/splitinfo-sms');
   }

   smsFeatureSwitch(): Promise<GetResponseType> {
      return this._connection.get('sms/sms-feature-switch');
   }

   sendStatus(): Promise<GetResponseType> {
      return this._connection.get('sms/send-status');
   }

   getSmsList(
      page: number = 1,
      boxType: BoxTypeEnum = BoxTypeEnum.LOCAL_INBOX,
      readCount: number = 20,
      sortType: number = 0,
      ascending: number = 0,
      unreadPreferred: number = 0
   ): Promise<GetResponseType> {
      return this._connection.postGet('sms/sms-list', {
         'PageIndex': page,
         'ReadCount': readCount,
         'BoxType': boxType,
         'SortType': sortType,
         'Ascending': ascending,
         'UnreadPreferred': unreadPreferred,
      });
   }

   /**
    * Delete single SMS by its ID
    * @param smsId Id of SMS you wish to delete
    */
   deleteSms(smsId: number): Promise<SetResponseType> {
      return this._connection.postSet('sms/delete-sms', { 'Index': smsId });
   }

   backupSim(fromDate: Date, isMove: boolean = false): Promise<SetResponseType> {
      return this._connection.postSet('sms/backup-sim', {
         'IsMove': isMove ? 1 : 0,
         'Date': fromDate.toISOString().slice(0, 19).replace('T', ' ')
      });
   }

   setRead(smsId: number): Promise<SetResponseType> {
      return this._connection.postSet('sms/set-read', {
         'Index': smsId
      });
   }

   saveSms(
      phoneNumbers: Array<string>,
      message: string,
      smsIndex: number = -1,
      sca: string = '',
      textMode: TextModeEnum = TextModeEnum.SEVEN_BIT,
      fromDate?: Date,
   ): Promise<SetResponseType> {

      if (!fromDate) {
         fromDate = new Date();
      }

      /*dicttoxml_xargs = {
          'item_func': lambda x: x[:-1]
      }*/

      return this._connection.postSet('sms/save-sms', {
         'Index': smsIndex,
         'Phones': { 'Phone' : phoneNumbers },
         'Sca': sca,
         'Content': message,
         'Length': message.length,
         'Reserved': textMode,
         'Date': fromDate.toISOString().slice(0, 19).replace('T', ' ')
      });
   }

   sendSms(
      phoneNumbers: Array<string>,
      message: string,
      smsIndex: number = -1,
      sca: string = '',
      textMode: TextModeEnum = TextModeEnum.SEVEN_BIT,
      date?: Date,
   ): Promise<SetResponseType> {

      if (!date) {
         date = new Date();
      }

      /*
  dicttoxml_xargs = {
      'item_func': lambda x: x[:-1]
  }*/

      return this._connection.postSet('sms/send-sms', {
         'Index': smsIndex,
         'Phones': { 'Phone' : phoneNumbers },
         'Sca': sca,
         'Content': message,
         'Length': message.length,
         'Reserved': textMode,
         'Date': date.toISOString().slice(0, 19).replace('T', ' ')
      });
   }

   cancelSend(): Promise<SetResponseType> {
      /*, dicttoxml_xargs={
         'root': False,
     }*/
      return this._connection.postSet('sms/cancel-send', {
         'request': 1,
      });
   }

   config(): Promise<GetResponseType> {
      return this._connection.get('sms/config');
   }

   setConfig(
      sca: string,
      saveMode: SaveModeEnum = SaveModeEnum.LOCAL,
      validity: number = 10752,
      useSReport: boolean = false,
      sendType: SendTypeEnum = SendTypeEnum.SEND,
      priority: PriorityEnum = PriorityEnum.NORMAL
   ): Promise<SetResponseType> {
      return this._connection.postSet('sms/config', {
         'SaveMode': saveMode,
         'Validity': validity,
         'Sca': sca,
         'UseSReport': useSReport,
         'SendType': sendType,
         'Priority': priority
      });
   }

   smsCountContact(): Promise<GetResponseType> {
      return this._connection.get('sms/sms-count-contact');
   }

   /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
    */
   getSmsListPdu(): Promise<GetResponseType> {
      return this._connection.get('sms/sms-list-pdu');
   }

   /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
    */
   splitSms(): Promise<GetResponseType> {
      return this._connection.get('sms/split-sms');
   }

   /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
    */
   sendSmsPdu(): Promise<GetResponseType> {
      return this._connection.get('sms/send-sms-pdu');
   }

   /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
    */
   recoverSms(): Promise<GetResponseType> {
      return this._connection.get('sms/recover-sms');
   }

   /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
    */
   copySms(): Promise<GetResponseType> {
      return this._connection.get('sms/copy-sms');
   }

   /**
    * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
    */
   moveSms(): Promise<GetResponseType> {
      return this._connection.get('sms/move-sms');
   }
}

