import { ApiGroup } from '../ApiGroup';
import { GetResponseType, SetResponseType } from '../types';


export class Language extends ApiGroup {
    setCurrentLanguage(current_language: string): Promise<SetResponseType> {
        return this._connection.postSet('language/current-language', {
            'CurrentLanguage': current_language
        });
    }

    currentLanguage(): Promise<GetResponseType> {
        return this._connection.get('language/current-language');
    }
}