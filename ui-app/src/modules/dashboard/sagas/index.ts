/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH, RECEIVED } from '../actions';
import { fetchLabel } from '../../../services/api';

function* fetchApi() {
    const endpoint = '/api/label/find';
    const response = yield call(fetchLabel, endpoint, { responseType: "json" });
    const data = yield response.status ? response.data : [];

    yield put({ type: RECEIVED, payload: data });
}

export function* loadLabels() {
    yield takeEvery(FETCH, fetchApi);
}