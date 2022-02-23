import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import * as tough from 'tough-cookie';
import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import * as FormData  from 'form-data';


export class Session {
    axiosInstance!: AxiosInstance;
    cookieJar: tough.CookieJar;


    constructor(axios_config: AxiosRequestConfig) {
        const cookieStore = new tough.MemoryCookieStore();
        this.cookieJar = new tough.CookieJar(cookieStore);
        this.axiosInstance = wrapper(axios.create({
            ...axios_config,
            jar: this.cookieJar,
            withCredentials: true
        }));
    }

    async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.axiosInstance.get(url, config);
    }

    async post(url: string, data?: string | FormData, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.axiosInstance.post(url, data, config);
    }
}
