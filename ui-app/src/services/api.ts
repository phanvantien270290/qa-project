/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import axios from 'axios';

export const fetchData = (url: string, params: any) => {
    return axios.get(url, params).then(res => res)
};
export const findOne = (url: string, params: any) => {
    return axios.get(url, params).then(res => res)
};
export const create = (url: string, params: any) => {
    return axios.post(url, params).then(res => res)
};
export const update = (url: string, params: any) => {
    return axios.put(url, params).then(res => res)
};
export const deleteOne = (url: string, _id: string) => {
    return axios.delete(url + `/${_id}`).then(res => res.data)
};
export const fetchLabel = (url: string, params: any) => {
    return axios.get(url, params).then(res => res.data);
};
