/**
 * @owner BlueSky
 * @description Session storage
 * @since 1.0.0
 * @date May 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { saveJson, loadJson } from "./storage.service"

const USER_PROFILE = 'USER::PROFILE';

export const persist = (user: IUser) => {
    return saveJson(USER_PROFILE, user);
}

export const retrieve = () => {
    const user: IUser = loadJson(USER_PROFILE);
    return user;
}

export const isLogged = () => {
    const user: IUser = loadJson(USER_PROFILE);
    return !!(user && user.id);
}