/**
 * @owner BlueSky
 * @description Handle accesses into Label Object
 * @since 1.0.0
 * @date Aug 10, 2020
 * @contributors
 *      Tien Phan <tienphan@ccintegration.com>
 */
import { Request, Response } from "express";
import BaseController from "./base.controller";
import ItemMasterService, { IItemMasterService } from '../services/item-master.service';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { IItemMasterProps } from '../interfaces/item-master.interface';
import { CustomResponse } from '../interfaces/custom-response.interface';
export default class PrinterController extends BaseController {
    service: IItemMasterService;
    constructor(service: ItemMasterService) {
        super(service);
    }

    getDataset(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);
        let searchFields: IItemMasterProps = {};
        const response: CustomResponse = {
            status: false
        }
        const options: FilterOption = { fields: { partNumber: 1, custId: 1, _id: 0 } };
        if (searchParams.searchFields) {
            let _searchFields: IItemMasterProps = searchParams.searchFields;
            searchFields = {
                ...searchFields,
                ..._searchFields,
            }
        }
        this.service.find(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong!';
                res.status(500).send(response);
            });
    }
}