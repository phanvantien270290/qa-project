/**
 * @owner BlueSky
 * @description Handle accesses into Label Object
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import BaseController from "./base.controller";
import { ILabelService } from '../services/label.service';
import LabelTemplateService from '../services/label-template.service';
import LabelTemplateRepository from '../repositories/label-template.repository';
import ItemMappingService from '../services/item-mapping.service';
import ItemMappingRepository from '../repositories/item-mapping.repository';
import { STATUS } from '../utils/enum.util';
import { CustomResponse } from '../interfaces/custom-response.interface';
import { StringHelper } from '../utils/helper.util';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { ILabelProps } from '../interfaces/label.interface';

export default class LabelController extends BaseController {
    service: ILabelService;
    constructor(service: ILabelService) {
        super(service);
    }

    find(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);

        const searchFields: ILabelProps = {};
        const options: FilterOption = searchParams.options;

        if (searchParams.searchFields) {
            const _searchFields: ILabelProps = searchParams.searchFields;
            if (_searchFields.custId) {
                searchFields.custId = _searchFields.custId;
            }
        }
        this.service.paginate(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    print(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        this.service.print(searchParams.criteria, searchParams.labelTemplate, {})
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    /**
     * Define an API for calling Print functionaity via other applications
     * @param req
     * @param res
     * @description
     *      Parameter should be formated: { customer: '', manfPartNumber: '', serialNumber: '' }
     *      Business logic:
     *          Find a ready item master based on the manufacturer part number via the Metadata database
     *          Find templates based on customer and manfPartNumber - Print to all templates found
     *          Insert this label info into the Label collection if not be available
     */
    async apiPrint(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        const response: CustomResponse = {
            status: false
        };

        if (!StringHelper.isString(searchParams.customer)
            || !StringHelper.isString(searchParams.manfPartNumber)
            || !StringHelper.isString(searchParams.serialNumber)) {
            response.msg = `Parameters are invaid.`;
            res.status(200).send(response);
            return;
        }

        searchParams.customer = searchParams.customer.trim();
        searchParams.partNumber = searchParams.manfPartNumber.trim();
        searchParams.serialNumber = searchParams.serialNumber.trim();
        // We know that the Part# <> manf. Part#.
        // So we have to get the mapped data to determine Part# for this action
        const mappingService = new ItemMappingService(new ItemMappingRepository()),
            mappingFilter: any = {
                manfPartNumber: {
                    $elemMatch: {
                        id: searchParams.partNumber,
                        status: STATUS.ACTIVE
                    }
                }
            };
        if (StringHelper.isString(searchParams.modelType)) {
            mappingFilter.manfPartNumber['$elemMatch'].type = searchParams.modelType.toUpperCase().trim();
        }
        const itemMapped = (await mappingService.retrieve(mappingFilter)).data;

        if (itemMapped && itemMapped.partNumber) {
            searchParams.partNumber = itemMapped.partNumber;
        }

        // Need to determine: the templates for label
        const templateFilter = {
            customerSettings: {
                $elemMatch: {
                    custId: searchParams.customer,
                    partNumber: searchParams.partNumber
                }
            }
        };

        const templateService = new LabelTemplateService(new LabelTemplateRepository());
        const templateArr = (await templateService.find(templateFilter)).data;

        if (!templateArr) {
            response.msg = `Do not define any label template for this model [${searchParams.partNumber}]`;
            res.status(200).send(response);
            return;
        }

        // Define a Label if not found
        const labelFilter = {
            partNumber: searchParams.partNumber,
            serialNumber: searchParams.serialNumber,
            custId: searchParams.customer
        };
        const labelInfo = await this.service.findAndInsert(labelFilter, null);

        if (!labelInfo.data) {
            response.msg = labelInfo.msg;
            res.status(200).send(response);
            return;
        }

        const printList = [], printOpts = { accountName: searchParams.printedBy };
        for (const templateInfo of templateArr) {
            printList.push(this.service.print(labelFilter, templateInfo, printOpts));
        }

        Promise.all(printList)
            .then(results => {
                const _resp = {
                    oemPartNumber: searchParams.partNumber,
                    oemSerialNumber: '',
                    labels: []
                };
                const len = results.length;
                for (let i = 0; i < len; i++) {
                    const res = results[i];
                    _resp.oemSerialNumber = res.data[0].oemSerialNumber;
                    _resp.labels.push({
                        status: res.status,
                        template: res.data[0].template,
                        printer: res.data[0].printer,
                        msg: res.msg
                    });
                }

                res.status(200).send(_resp);
            });
    }
}