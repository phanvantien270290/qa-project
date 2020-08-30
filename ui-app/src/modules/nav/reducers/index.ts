/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { NAV_RENDER } from '../actions';

const initialState = {
    data: []
};

export default function navReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case NAV_RENDER:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}