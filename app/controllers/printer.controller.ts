/**
 * @owner BlueSky
 * @description Handle accesses into Printer Object
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { Request, Response } from "express";
import BaseController from "./base.controller";
import { IPrinterService } from '../services/printer.service';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { IPrinterProps } from '../interfaces/printer.interface';
import { CustomResponse } from '../interfaces/custom-response.interface';
import { convertMsg } from '../utils/message.util';
import { YESNO } from '../utils/enum.util';
import { removeWhiteSpace } from '../utils/helper.util';
export default class PrinterController extends BaseController {
    service: IPrinterService;
    constructor(service: IPrinterService) {
        super(service);
    }

    getDataset(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);

        const searchFields: IPrinterProps = { status: 'ACTIVE' };
        const options: FilterOption = {
            fields: { id: 1, name: 1, location: 1, _id: 0 },
            sort: searchParams.options ? searchParams.options.sort : null
        };

        this.service.find(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    getListPrinter(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);
        const searchFields: IPrinterProps = {};
        const options: FilterOption = searchParams.options;
        const response: CustomResponse = {
            status: false
        }

        if (searchParams.searchFields) {
            const _searchFields: IPrinterProps = searchParams.searchFields;
            if (_searchFields.name) {
                searchFields.name = new RegExp(removeWhiteSpace(_searchFields.name), 'gi') as any;
            }
            if (_searchFields.location) {
                searchFields.location = new RegExp(_searchFields.location, 'gi') as any;
            }
            if (_searchFields.status) {
                searchFields.status = _searchFields.status.trim().toUpperCase();
            }
        }
        this.service.paginate(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong';
                res.status(500).send(response);
            });
    }

    getPrinter(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        let response: CustomResponse = {
            status: false
        }
        this.service.retrieve(searchParams, {})
            .then(resp => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong';
                res.status(500).send(response);
            });
    }

    createPrinter(req: Request, res: Response) {
        const { data }: ICRUDParameter<IPrinterProps> = this.getParameters(req);
        let response: CustomResponse = {
            status: false
        }
        if (!data.id || !data.id.trim()) {
            response.msg = 'Printer ID is required';
        }
        if (!data.name || !data.name.trim()) {
            response.msg = 'Printer Name is required'
        }
        if (response.msg) {
            res.status(200).send(response);
        } else {
            this.service.save(data).then(resp => {
                if (resp.msg) {
                    resp.msg = convertMsg(resp.msg, data.id);
                }
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong!';
                res.status(500).send(response);
            });
        }
    }

    updatePrinter(req: Request, res: Response) {
        const { _id, data }: ICRUDParameter<IPrinterProps> = this.getParameters(req);
        const response: CustomResponse = {
            status: false
        }

        if (data.cutter !== YESNO.YES && data.cutter !== YESNO.NO) {
            data.cutter = YESNO.YES;
        }

        if (!_id) {
            response.msg = 'Cannot find this printer';
        } else if (data.darkness && (data.darkness.min > data.darkness.max)) {
            response.msg = 'Darkness min number less than max number';
        } else if (data.speed && (data.speed.min > data.speed.max)) {
            response.msg = 'Speed min number less than max number';
        } else if (!data.name) {
            response.msg = 'Printer Name is required';
        } else if (!data.id) {
            response.msg = 'Printer ID is required';
        }

        if (response.msg) {
            res.status(200).send(response);
        } else {
            this.service.updateOne({ _id }, data, {}).then(resp => {
                if (resp.msg) {
                    resp.msg = convertMsg(resp.msg, data.id);
                }
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong!';
                res.status(500).send(response);
            });
        }
    }

    deleteOnePrinter(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        const response: CustomResponse = {
            status: false
        }
        if (!searchParams._id) {
            response.msg = 'Can\'t find this printer';
        }

        if (response.msg) {
            res.status(200).send(response);
        } else {
            this.service.deteleOne(searchParams, true).then((resp) => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong!';
                res.status(500).send(response);
            });
        }
    }
}