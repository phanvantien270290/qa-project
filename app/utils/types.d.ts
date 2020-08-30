/**
 * @owner BlueSky
 * @description Define global objects - Not need to import for using
 * @since 1.0.0
 * @date May 14, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

interface ISession {
    token: string;
    salt: string;
    device: string;
}

interface IAppSession {
    [key: string]: ISession
}

interface ISearchParams {
    searchFields?: {
        [prop: string]: any
    };
    searchText?: string;
    options?: {
        [prop: string]: any,
        limit?: number;
        page?: number;
        sort?: {
            [prop: string]: any,
        }
    };
    [key: string]: any;
}

interface ICRUDParameter<T = null> {
    _id?: string;
    data?: T;
    [key: string]: any;
}