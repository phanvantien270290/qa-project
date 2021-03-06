/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { GET_LIST, GET_ONE } from './actions';
import { ILabelTemplate, ILabelTemplateNullable } from '../../../interfaces/label-template.interface';
const initGetList: IGetListResp<ILabelTemplate> = {
    data: [],
    totalCount: 0,
    loading: false
};
const initGetOne: IGetOneResp<ILabelTemplateNullable> = {
    data: null,
    loading: false
};
const getOneLabelTemplateReducer = (state = initGetOne, action: IAction): IGetOneResp<ILabelTemplateNullable> => {
    switch (action.type) {
        case GET_ONE.REQUEST:
            return { data: null, loading: true };
        case GET_ONE.SUCCESS:
            const { data } = action.payload;
            return {  data, loading: false };
        case GET_ONE.FAILURE:
            return { data: null, loading: false };
        default:
            return state;
    }
}

const getListLabelTemplateReducer = (state = initGetList, action: IAction): IGetListResp<ILabelTemplate> => {
    switch (action.type) {
        case GET_LIST.REQUEST:
            return { ...state, data: [], loading: true };
        case GET_LIST.SUCCESS:
            const { data, totalCount } = action.payload;
            return { data, totalCount, loading: false };
        case GET_LIST.FAILURE:
            return { ...state, data: [], loading: false };
        default:
            return state;
    }
}

export {
    getListLabelTemplateReducer,
    getOneLabelTemplateReducer
}