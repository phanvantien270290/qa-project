/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

export const NAV_FETCH = 'NAV::FETCH_MENU';
export const NAV_RENDER = 'NAV::RENDER_MENU';

export function fetchMenu(payload: object) {
    return {
        type: NAV_FETCH,
        payload
    };
}