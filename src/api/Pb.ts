import { ApiGroup } from '../ApiGroup';
import { GetResponseType } from '../types';

/**
 * Phone Book
 */
export class Pb extends ApiGroup {
    /**
     * Find number in PhoneBook
     * @param phoneNumber 
     */
    getPbMatch(phoneNumber: string): Promise<GetResponseType> {
        return this._connection.postGet('pb/pb-match', {
            'Phone': phoneNumber
        });
    }

    getPbList(
        page: number = 1,
        keyWord: string = '',
        groupId: number = 0,
        readCount: number = 50
    ): Promise<GetResponseType> {
        return this._connection.postGet('pb/pb-list', {
            'GroupID': groupId,
            'PageIndex': page,
            'ReadCount': readCount,
            'KeyWord': keyWord
        });
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    pbCount(): Promise<GetResponseType> {
        return this._connection.postGet('pb/pb-count', {});
    }

    /**
     * Endpoint found by reverse engineering B310s-22 firmware, unknown usage
     */
    groupCount(): Promise<GetResponseType> {
        return this._connection.postGet('pb/group-count', {});
    }

}
