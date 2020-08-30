/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { GET_LIST_ITEM, GET_LIST_PARTNER } from './actions';
import { IPartner } from '../../interfaces/partner.interface';
import { IItemMaster } from '../../interfaces/item-master.interface';

const initData: any = {
    data: [],
    loading: false
};
const getListPartnerReducer = (state = initData, action: IAction): IGetListResp<IPartner> => {
    switch (action.type) {
        case GET_LIST_PARTNER.REQUEST:
            return { ...state, data: [], loading: true };
        case GET_LIST_PARTNER.SUCCESS:
            const { data } = action.payload;
            return { ...state, data, loading: false };
        case GET_LIST_PARTNER.FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
const getListItemReducer = (state = initData, action: IAction): IGetListResp<IItemMaster> => {
    switch (action.type) {
        case GET_LIST_ITEM.REQUEST:
            return { ...state, data: [], loading: true };
        case GET_LIST_ITEM.SUCCESS:
            const { data } = action.payload;
            return { ...state, data, loading: false };
        case GET_LIST_ITEM.FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
export { getListPartnerReducer, getListItemReducer }