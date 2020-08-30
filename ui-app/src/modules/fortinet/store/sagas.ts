/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_LIST, GET_ONE } from './actions';
import { getListFortinet, findOneFortinet } from './services';
import {convertParamsToRequest} from '../../../utils/helper';
function* getOne(payload?: any) {
    try {
        const params = payload.params;
        const response = yield call(findOneFortinet, params);
        const data = yield response.status ? { data: response.data.data } : { data: null };
        yield put({ type: GET_ONE.SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_ONE.FAILURE });
    }
}

function* getList(payload?: any) {

    try {
        const params = convertParamsToRequest(payload.params);
        const response = yield call(getListFortinet, params);
        const data = yield response.status ? { data: response.data.data, totalCount: response.data.total } : { data: [], totalCount: 0 };
        yield put({ type: GET_LIST.SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_LIST.FAILURE });
    }
}

export function* watchFetchFortinet() {
    yield takeEvery(GET_LIST.REQUEST, getList);
    yield takeEvery(GET_ONE.REQUEST, getOne);
}
