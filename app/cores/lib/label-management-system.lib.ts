/**
 * @owner BlueSky
 * @description Define Label Management System API library
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import APIHandler from "./axios-handler.lib";
import CSVCore from './csv.lib';
import { formatUriPath } from '../../utils/helper.util';
import { LMS_API_DATA_MODE as MODE } from '../../utils/enum.util';
import { CustomResponse } from '../../interfaces/custom-response.interface';

export default class LMSCore {
    uri: string;
    constructor(private host: string, private port: number = 56425, private path: string = '') {
        this.uri = `${this.host}:${this.port}/${formatUriPath(this.path)}`;
    }

    connect(): void {

    }

    async print(data: any, mode?: MODE): Promise<CustomResponse> {
        let str: string = await CSVCore.fromJson(data);
        if (mode === MODE.JSON) {
            str = JSON.stringify(data, null, 4);
        }
        const result = await APIHandler.post(this.uri, str);

        const res: CustomResponse = {
            status: result.status,
            msg: result.msg
        };
        if (result.data && result.data.status === 'False') {
            res.status = false;
            res.msg = result.data.error;
        }
        return res;
    }
}