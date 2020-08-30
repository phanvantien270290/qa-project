
/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { fetchData } from '../../services/api';

export const servicesAPI = {
    getPartnerCombobox: '/api/partner/combobox',
    getItemCombobox: '/api/item/combobox'
}

const fetchPartnerCombobox = (params: any) => {
    return fetchData(servicesAPI.getPartnerCombobox, params).then(resp => resp.data);
}
const fetchItemCombobox = (params: any) => {
    return fetchData(servicesAPI.getItemCombobox, params).then(resp => resp.data);
}

export {
    fetchPartnerCombobox,
    fetchItemCombobox
}