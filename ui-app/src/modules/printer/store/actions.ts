/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { createRequestTypes } from '../../../utils/helper';

export const GET_LIST = createRequestTypes('PRINTER::GETLIST');

export function getListPrinter(params?: any) {
    return {
        type: GET_LIST.REQUEST,
        params
    };
}