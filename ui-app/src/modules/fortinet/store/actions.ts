/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { createRequestTypes } from '../../../utils/helper';

export const GET_LIST = createRequestTypes('Fortinet::GETLIST');
export const GET_ONE = createRequestTypes('Fortinet::GETONE');

export function getFortinet(params?: any) {
    return {
        type: GET_ONE.REQUEST,
        params
    };
}

export function getListFortinet(params?: any) {
    return {
        type: GET_LIST.REQUEST,
        params
    };
}
