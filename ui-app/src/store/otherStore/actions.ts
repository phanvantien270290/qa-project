/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { createRequestTypes } from '../../utils/helper';

export const GET_LIST_PARTNER = createRequestTypes('PartnerCombobox::GETLIST');
export const GET_LIST_ITEM = createRequestTypes('ItemCombobox::GETLIST');

export function getListPartners(params?: any) {
    return {
        type: GET_LIST_PARTNER.REQUEST,
        params
    };
}
export function getListItemsCombobox(params?: any) {
    return {
        type: GET_LIST_ITEM.REQUEST,
        params
    };
}
