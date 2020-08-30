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
import { getListLabelTemplate, findOneLabelTemplate } from './services';

function* getOne(payload?: any) {
    try {
        const params = payload.params;
        const response = yield call(findOneLabelTemplate, params);
        const data = yield response.status ? { data: response.data.data } : { data: null };
        yield put({ type: GET_ONE.SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_ONE.FAILURE });
    }
}

function* getList(payload?: any) {
    try {
        const params = payload.params;
        const response = yield call(getListLabelTemplate, params);
        const data = yield response.status ? { data: response.data.data, totalCount: response.data.total } : { data: [], totalCount: 0 };
        yield put({ type: GET_LIST.SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_LIST.FAILURE });
    }
}

export function* watchFetchLabelTemplate() {
    yield takeEvery(GET_LIST.REQUEST, getList);
    yield takeEvery(GET_ONE.REQUEST, getOne);
}
