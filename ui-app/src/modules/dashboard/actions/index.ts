/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

export const FETCH = "FETCH";
export const RECEIVED = "RECEIVED";

export function fetchApi() {
    return {
        type: FETCH
    };
}