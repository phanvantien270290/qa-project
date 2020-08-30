/**
 * @owner BlueSky
 * @description Handle business logic for Label Object
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { ILabelRepository } from '../repositories/label.repository';
import BaseService, { IService } from './base.service';
import LMSCore from '../cores/lib/label-management-system.lib';
import TemplateModelService from './template-model.service';
import dotenv from "dotenv";
import { ILabelTemplate } from '../interfaces/label-template.interface';
import PartnerService from './partner.service';
import PartnerRepository from '../repositories/partner.repository';
import ItemMasterService from './item-master.service';
import ItemMasterRepository from '../repositories/item-master.repository';
import { IPartner } from '../interfaces/partner.interface';
import { IItemMaster } from '../interfaces/item-master.interface';
import { LABEL_RULE } from '../utils/enum.util';
import { generateByLabelRule, formatUriPath } from '../utils/helper.util';
import LabelPrintingService from './label-printing.service';
import LabelPrintingRepository from '../repositories/label-printing.repository';
dotenv.config();

export interface ILabelService extends IService {
    print(criteria: any, templateInfo: ILabelTemplate, option: any);
    findAndInsert(searchParams, labelInfo: any);
}

export default class LabelService extends BaseService implements ILabelService {
    repository: ILabelRepository;
    constructor(repository: ILabelRepository) {
        super(repository);
    }

    /**
     * Define an Print service
     * @param searchParams
     * @param templateInfo
     * @description
     *      Business logic:
     *          Insert/Update this label info into the Label collection
     *          Insert the printed data into the LabelPrinting as a history
     */
    async print(criteria: any, templateInfo: ILabelTemplate, option: any = {}) {
        const resp = await this.repository.getFulLabels(criteria,{});
        if (!resp || (resp && !resp.data) || !templateInfo) {
            return null;
        }
        option.numberOfLabel = resp.data.length;
        const iModel = new TemplateModelService(templateInfo.id, templateInfo.path, templateInfo.builderMethod);

        const data = [], histories = [], objUpdated = {}, printedResp = [];
        for (const label of resp.data) {
            const flag = label.oemSerialNumber ? true : false;
            if (!flag) {
                if (label.option) {
                    label.option.increment = label.option.increment ? ++label.option.increment : 1;
                }
                label.oemSerialNumber = generateByLabelRule(label.serialNumber, label.labelRule, label.option);
                objUpdated[label._id._id.toString()] = {
                    oemSerialNumber: label.oemSerialNumber,
                    option: label.option
                };
            }
            // data for Print
            data.push(
                iModel.buildTemplate(label, templateInfo.printerSettings, label.labelsettings[0].labelInformation, option)
            );
            printedResp.push({
                oemPartNumber: label.partNumber,
                oemSerialNumber: label.oemSerialNumber,
                template: templateInfo.id,
                printer: templateInfo.printerSettings.id
            });
            // data for Print History - Label Printing collection
            histories.push({
                labelId: label._id,
                label: label,
                templateId: templateInfo._id,
                template: templateInfo.toObject(),
                printerName: templateInfo.printerSettings.id,
                reprinted: flag,
                printedBy: (option && option.accountName) ? option.accountName : '',
                printedAt: Date.now(),
                obsoleted: false,
                deleted: false
            });
        }

        // Process printing Labels
        let uriPath = formatUriPath(templateInfo.apiPath);
        if (uriPath) {
            uriPath = `${process.env.LMS_ENV}/${uriPath}`;
        }
        const iLMSCore = new LMSCore(process.env.LMS_HOST, Number(process.env.LMS_PORT), uriPath);
        const resultPrinted = await iLMSCore.print(data);
        if (resultPrinted.status) {
            // Update Label collection - oemSerialNumber
            const updates = [];
            for (const id in objUpdated) {
                updates.push(this.findAndUpdate({ _id: id }, objUpdated[id], { multi: false }));
            }
            Promise.all(updates);

            // Insert Print History
            const iHistoryService = new LabelPrintingService(new LabelPrintingRepository());
            iHistoryService.save(histories);
        }
        resultPrinted.data = printedResp;
        return resultPrinted;
    }

    async findAndInsert(searchParams, labelInfo: any) {
        if (labelInfo) {
            return this.findAndUpdate(searchParams, labelInfo, { upsert: false });
        }
        const result = await this.retrieve(searchParams);
        if (result.data) {
            return result;
        }
        const partnerService = new PartnerService(new PartnerRepository());
        const itemService = new ItemMasterService(new ItemMasterRepository());

        const partner: IPartner = (await partnerService.retrieve({ custId: searchParams.custId })).data;
        const itemMaster: IItemMaster = (await itemService.retrieve({ partNumber: searchParams.partNumber, custId: searchParams.custId })).data;

        labelInfo = {
            labelRule: LABEL_RULE.CURRENT_DATE,
            itemMasterId: itemMaster ? itemMaster._id : null,
            partNumber: itemMaster ? itemMaster.partNumber : '',
            partnerId: partner ? partner.id : 0,
            custId: partner ? partner.custId : '',
            serialNumber: searchParams.serialNumber,
            oemSerialNumber: '',
            option: { buildNo: 1 },
            obsoleted: false,
            deleted: false
        };

        const res = await this.save(labelInfo);
        if (res.status) {
            res.data = labelInfo;
        }
        return res;
    }
}