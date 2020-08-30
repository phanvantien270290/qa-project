/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { createRequestTypes } from '../../../utils/helper';

export const GET_LIST = createRequestTypes('LabelTemplate::GETLIST');
export const GET_ONE = createRequestTypes('LabelTemplate::GETONE');

export function getLabelTemplate(params?: any) {
    return {
        type: GET_ONE.REQUEST,
        params
    };
}

export function getListLabelTemplate(params?: any) {
    return {
        type: GET_LIST.REQUEST,
        params
    };
}
