/**
 * @owner BlueSky
 * @description Define AXIOS Handler library <https://github.com/axios/axios>
 * @since 1.0.0
 * @date Apr 06, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import Axios, { Method, ResponseType } from "axios";
import { CustomResponse } from '../../interfaces/custom-response.interface';

export default class APIHandler {
    /**
     * Create a resource
     * @param url 
     * @param data 
     */
    static post(url: string, data: any): Promise<CustomResponse> {
        return this.request(url, data, "POST");
    }

    /**
     * Update/Create a resource by overriding itself
     * @param url 
     * @param data 
     */
    static put(url: string, data: any): Promise<CustomResponse> {
        return this.request(url, data, "PUT");
    }

    /**
     * A partial update to a resource
     * @param url 
     * @param data 
     */
    static patch(url: string, data: any): Promise<CustomResponse> {
        return this.request(url, data, "PATCH");
    }

    /**
     * Get a resource
     * @param url 
     * @param params 
     */
    static get(url: string, params: any): Promise<CustomResponse> {
        return this.request(url, params);
    }

    /**
     * Delete resource
     * @param url 
     * @param params 
     */
    static delete(url: string, params: any): Promise<CustomResponse> {
        return this.request(url, params, "DELETE");
    }

    /**
     * Get metadata of a resource
     * @param url 
     * @param params 
     */
    static head(url: string, params: any): Promise<CustomResponse> {
        return this.request(url, params, "HEAD");
    }

    /**
     * 
     * @param url 
     * @param params 
     */
    static options(url: string, params: any): Promise<CustomResponse> {
        return this.request(url, params, "OPTIONS");
    }

    private static request(url: string, parameter: any, method: Method = "GET", responseType: ResponseType = "json"): Promise<CustomResponse> {
        const methodIndex = ['PUT', 'POST', 'PATCH'].indexOf(method);
        return new Promise(resolve => {
            Axios.request({
                url,
                method,
                params: methodIndex < 0 ? parameter : {},
                data: methodIndex >= 0 ? parameter : {},
                // adapter?: AxiosAdapter;
                // auth?: AxiosBasicCredentials;
                responseType,
                // xsrfCookieName?: string;
                // xsrfHeaderName?: string;
                // onUploadProgress?: (progressEvent: any) => void;
                // onDownloadProgress?: (progressEvent: any) => void;
            }).then(res => {
                resolve({ data: res.data, status: true });
            }).catch(reason => {
                resolve({ status: false, msg: reason.response.data });
            })
        });
    }
}