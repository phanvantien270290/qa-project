/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { NAV_FETCH, NAV_RENDER } from '../actions';

const fetchApi = () => {
    return new Promise(resolve => {
        resolve(data);
    });
}

function* fetchMenu() {
    const response = yield call(fetchApi);
    yield put({ type: NAV_RENDER, payload: response });
}

export function* loadMenu() {
    yield takeLatest(NAV_FETCH, fetchMenu);
}

const data: INavItem[] = [{
    label: 'Administration',
    name: 'Administration',
    children: [{
        label: 'API Token', name: 'APIToken', path: '/token'
    }, {
        label: 'Label Information', name: 'LabelInformation', path: '/labelinformation'
    }, {
        label: 'Printer', name: 'Printer', path: '/manage/printer'
    }, {
        label: 'Fortinet', name: 'Fortinet', path: '/manage/fortinet'
    }
    ]
}, {
    label: 'Dashboard',
    name: 'Dashboard',
    path: '/dashboard'
}, {
    label: 'Label Management',
    name: 'LabelManagement',
    children: [{
        label: 'Label', name: 'Label', path: '/manage/label'
    }, {
        label: 'Label Template', name: 'LabelTemplate', path: '/manage/label/template'
    }, {
        label: 'Label History', name: 'LabelPrinting', path: '/manage/label/history'
    }]
}, {
    label: 'About',
    name: '/about'
}];