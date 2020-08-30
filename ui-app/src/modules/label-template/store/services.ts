/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { fetchData, findOne, create, update, deleteOne } from '../../../services/api';
import { ILabelTemplate } from '../../../interfaces/label-template.interface';

export const labeltemplateAPI = {
    getList: '/api/label/template/find',
    getOne: '/api/label/template/getone',
    create: '/api/label/template/create',
    update: '/api/label/template/update',
    delete: '/api/label/template/delete',
}

const getListLabelTemplate = (params: IGetListParams) => {
    return fetchData(labeltemplateAPI.getList, { params })
}
const findOneLabelTemplate = (params: IFindOneParams) => {
    return findOne(labeltemplateAPI.getOne, { params })
}
const createLabelTemplate = (params: ICRUDParameter<ILabelTemplate>) => {
    return create(labeltemplateAPI.create, params)
}
const updateLabelTemplate = (params: ICRUDParameter<ILabelTemplate>) => {
    return update(labeltemplateAPI.update, params)
}
const deleteOneLabelTemplate = (_id: string) => {
    return deleteOne(labeltemplateAPI.delete, _id)
}

export {
    getListLabelTemplate,
    findOneLabelTemplate,
    createLabelTemplate,
    updateLabelTemplate,
    deleteOneLabelTemplate
}