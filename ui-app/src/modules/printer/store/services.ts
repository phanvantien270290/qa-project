/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { fetchData, findOne, create, update, deleteOne } from '../../../services/api';
import { IPrinter } from '../../../interfaces/printer.interface';
// import { create, update } from '../store/actions';

export const printerAPI = {
    getList: '/api/printer/find',
    getCombobox: '/api/printer/combobox',
    getOne: '/api/printer/getone',
    create: '/api/printer/create',
    update: '/api/printer/update',
    delete: '/api/printer/delete',
}
const getListPrinterCombobox = (params: ICRUDParameter) => {
    return fetchData(printerAPI.getCombobox, { params })
}
const getListPrinter = (params: ICRUDParameter) => {
    return fetchData(printerAPI.getList, { params })
}
const getPrinter = (params: ICRUDParameter) => {
    return findOne(printerAPI.getOne, { params })
}
const createPrinter = (params: ICRUDParameter<IPrinter>) => {
    return create(printerAPI.create, params)
}
const updatePrinter = (params: ICRUDParameter<IPrinter>) => {
    return update(printerAPI.update, params)
}
const deleteOnePrinter = (_id: string) => {
    return deleteOne(printerAPI.delete, _id)
}
export { getListPrinter, getPrinter, createPrinter, updatePrinter, deleteOnePrinter, getListPrinterCombobox }