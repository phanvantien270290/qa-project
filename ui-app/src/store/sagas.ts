/**
 * @owner BlueSky
 * @description Define a root saga for the app
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { all, spawn } from 'redux-saga/effects';
import { loadMenu } from '../modules/nav/sagas';
import { loadLabels } from '../modules/dashboard/sagas';
import { watchFetchPrinters } from '../modules/printer/store/sagas';
import { watchFetchLabelTemplate } from '../modules/label-template/store/sagas';
import {watchFetchOtherData} from './otherStore/sagas';
import { watchFetchFortinet } from '../modules/fortinet/store/sagas';
function* rootSaga() {
    yield all([
        spawn(loadMenu),
        spawn(loadLabels),
        spawn(watchFetchPrinters),
        spawn(watchFetchLabelTemplate),
        spawn(watchFetchFortinet),
        spawn(watchFetchOtherData),
    ]);
}
export default rootSaga;