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
import LabelTemplateService from '../services/label-template.service';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { ILabelTemplateProps, ILabelTemplate } from '../interfaces/label-template.interface';
import { CustomResponse } from '../interfaces/custom-response.interface';
import { convertMsg } from '../utils/message.util';
import { removeWhiteSpace } from '../utils/helper.util';
export default class LabelTemplateController extends BaseController {
    constructor(service: LabelTemplateService) {
        super(service);
    }

    find(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);
        const searchFields: ILabelTemplateProps = {};
        const options: FilterOption = searchParams.options;

        if (searchParams.searchFields) {
            const _searchFields: ILabelTemplateProps = searchParams.searchFields;
            if (_searchFields.name) {
                searchFields.name = new RegExp(removeWhiteSpace(_searchFields.name), 'gi') as any;
            }
            if (_searchFields.obsoleted === false || _searchFields.obsoleted === true) {
                searchFields.obsoleted = _searchFields.obsoleted;
            }
            if (_searchFields.custId || _searchFields.partNo) {
                searchFields.customerSettings = { $elemMatch: {} } as any;
                if (_searchFields.custId) {
                    searchFields.customerSettings['$elemMatch']['custId'] = new RegExp(_searchFields.custId, 'gi');
                }
                if (_searchFields.partNo) {
                    const partNoArr = Array.isArray(_searchFields.partNo) ? _searchFields.partNo : [_searchFields.partNo];
                    searchFields.customerSettings['$elemMatch']['partNumber'] = { $in: partNoArr };
                }
            }
        }
        this.service.paginate(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            });
    }
    retrieve(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        this.service.retrieve(searchParams)
            .then(resp => {
                res.status(200).send(resp);
            });
    }
    create(req: Request, res: Response) {
        const { data }: ICRUDParameter<ILabelTemplate> = this.getParameters(req);
        const resCustom: CustomResponse = {
            status: false
        };
        if (!data.id || !data.id.trim()) {
            resCustom.msg = 'Label Tempalte ID is required';
        }
        if (!data.name || !data.name.trim()) {
            resCustom.msg = 'Label Tempalte Name is required';
        }
        if (data.customerSettings) {
            data.customerSettings = data.customerSettings.filter((customer) => customer.custId);
        }
        if (resCustom.msg) {
            res.status(200).send(resCustom);
        } else {
            this.service.save(data).then(resp => {
                if (resp.msg) {
                    resp.msg = convertMsg(resp.msg, data.id);
                }
                res.status(200).send(resp);
            })
        }

    }
    updateOne(req: Request, res: Response) {
        const { _id, data }: ICRUDParameter<ILabelTemplate> = this.getParameters(req);
        const response: CustomResponse = {
            status: false
        }

        if (!data.name) {
            response.msg = 'Label Tempalte Name is required';
        }
        if (!data.id) {
            response.msg = 'Label Tempalte ID is required';
        }
        if (!_id) {
            response.msg = 'Can\'t find this Label Template';
        }
        if (response.msg) {
            res.status(200).send(response);
        } else {
            this.service.updateOne({ _id }, data).then(resp => {
                if (resp.msg) {
                    resp.msg = convertMsg(resp.msg, data.id);
                }
                res.status(200).send(resp);
            })
        }

    }
    deleteOne(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        const response: CustomResponse = {
            status: false
        }
        if (!searchParams._id) {
            response.msg = 'Can\'t find this Label Template';
        }
        if (response.msg) {
            res.status(200).send(response);
        } else {
            this.service.deteleOne(searchParams, true).then((resp) => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Can\'t find this Label Template';
                res.status(500).send(response);
            });
        }
    }
}