/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { GET_LIST } from './actions';
import { IPrinter } from '../../../interfaces/printer.interface';
const initGetList: IGetListResp<IPrinter> = {
    data: [],
    totalCount: 0,
    loading: false
};
const getListPrinterReducer = (state = initGetList, action: IAction): IGetListResp<IPrinter> => {
    switch (action.type) {
        case GET_LIST.REQUEST:
            return { ...initGetList, loading: true };
        case GET_LIST.SUCCESS:
            const { totalCount } = action.payload;
            return { data: action.payload.data, totalCount, loading: false };
        case GET_LIST.FAILURE:
            return { ...state,  loading: false };
        default:
            return state;
    }
}
export { getListPrinterReducer }