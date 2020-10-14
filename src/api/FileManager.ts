import { ApiGroup } from '../ApiGroup';
import { SetResponseType } from '../types';
import { AxiosResponse } from 'axios';
import { basename, extname } from 'path';


export class FileManager extends ApiGroup {
    /**
     * Uploads firmware update and triggers it
     * @param uploadfile file to upload
     * @param uploadfileName name of uploaded file
     */
    upload(uploadfile: Blob, uploadfileName: string): Promise<SetResponseType> {
        const uploadfileBasename = basename(uploadfileName);
        const extension = extname(uploadfileBasename).toLowerCase();
        if (!(extension in ['.bin', '.zip'])) {
            throw new Error('Only *.bin or *.zip is allowed');
        }
       
        return this._connection.postFile('filemanager/upload', {
            'uploadfile': uploadfile,
        }, {
            'cur_path': `OU:${uploadfileBasename}`
        }).then((response: AxiosResponse) => {
            return response.data;
        });
    }
}
    
