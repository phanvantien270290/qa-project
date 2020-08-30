/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { fetchData, findOne, create, update, deleteOne } from '../../../services/api';
import { IItemMaster } from '../../../interfaces/item-master.interface';

export const fortinetAPI = {
    getList: '/api/label/find',
    getOne: '/api/label/getone',
    print:'/api/label/print'
    // create: '/api/label/fortinet/create',
    // update: '/api/label/fortinet/update',
    // delete: '/api/label/fortinet/delete',
}

const getListFortinet = (params: IGetListParams) => {
    return fetchData(fortinetAPI.getList, {params:{...params,searchFields:{...params.searchFields,custId:'FORTINET'}}  })
}
const findOneFortinet = (params: IFindOneParams) => {
    return findOne(fortinetAPI.getOne, { params })
}
// const createFortinet = (params: ICRUDParameter<IItemMaster>) => {
//     return create(fortinetAPI.create, params)
// }
// const updateFortinet = (params: ICRUDParameter<IItemMaster>) => {
//     return update(fortinetAPI.update, params)
// }
// const deleteOneFortinet = (_id: string) => {
//     return deleteOne(fortinetAPI.delete, _id)
// }

export {
    getListFortinet,
    findOneFortinet,
    // createFortinet,
    // updateFortinet,
    // deleteOneFortinet
}