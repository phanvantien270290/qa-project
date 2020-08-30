/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { RECEIVED } from '../actions';
const initialState = {
    data: []
};
export default function dashboardReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case RECEIVED:
            const newState = {
                ...state,
                data: action.payload
            };
            return newState;
        default:
            return state;
    }
}