/**
 * @owner BlueSky
 * @description Define a root reducer for the app
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { combineReducers } from 'redux'
import NavReducer from '../modules/nav/reducers';
import DashboardReducer from '../modules/dashboard/reducers';
import { getListPrinterReducer } from '../modules/printer/store/reducers';
import { getListLabelTemplateReducer, getOneLabelTemplateReducer } from '../modules/label-template/store/reducers';
import { getListItemReducer, getListPartnerReducer } from './otherStore/reducers';
import { getOneFortinetReducer, getListFortinetReducer } from '../modules/fortinet/store/reducers';
export default combineReducers<IState>({
    nav: NavReducer,
    dashboard: DashboardReducer,
    printer: getListPrinterReducer,
    labelTemplate: combineReducers({
        getOne: getOneLabelTemplateReducer,
        getList: getListLabelTemplateReducer,
    }),
    partner: combineReducers({
        getCombobox: getListPartnerReducer
    }),
    itemMaster: combineReducers({
        getCombobox: getListItemReducer
    }),
    fortinet: combineReducers({
        getList: getListFortinetReducer,
        getOne: getOneFortinetReducer
    })
})