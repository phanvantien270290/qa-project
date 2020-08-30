/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_LIST_PARTNER, GET_LIST_ITEM } from './actions';
import { fetchPartnerCombobox, fetchItemCombobox } from './services';
import { IPrinter } from '../../interfaces/printer.interface';
import { IItemMaster } from '../../interfaces/item-master.interface';
function* getListPartner(payload?: any) {
    try {
        const params = payload.params;
        const response = yield call(fetchPartnerCombobox, params);
        const data: IPrinter[] = response.status ? response.data : [];
        yield put({ type: GET_LIST_PARTNER.SUCCESS, payload: { data } });

    } catch (error) {
        yield put({ type: GET_LIST_PARTNER.FAILURE });
    }
}
function* getListItemComBobox(payload?: any) {
    try {
        const params = payload.params;
        const response = yield call(fetchItemCombobox, {params});
        const data: IItemMaster[] = response.status ? response.data : [];
        yield put({ type: GET_LIST_ITEM.SUCCESS, payload: { data } });
    } catch (error) {
        yield put({ type: GET_LIST_ITEM.FAILURE });
    }
}
export function* watchFetchOtherData() {
    yield takeEvery(GET_LIST_PARTNER.REQUEST, getListPartner);
    yield takeEvery(GET_LIST_ITEM.REQUEST, getListItemComBobox);
}
