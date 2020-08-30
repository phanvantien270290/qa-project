/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_LIST } from './actions';
import { getListPrinter } from './services';

function* getList(payload?: any) {
    try {
        const params = payload.params;
        const response = yield call(getListPrinter, params);
        const data = yield response.status ? { data: response.data.data, totalCount: response.data.total } : { data: [], totalCount: 0 };
        yield put({ type: GET_LIST.SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_LIST.FAILURE });
    }
}

export function* watchFetchPrinters() {
    yield takeEvery(GET_LIST.REQUEST, getList);

}
