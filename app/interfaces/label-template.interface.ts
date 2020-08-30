/**
 * @owner BlueSky
 * @description Define ILabelTemplate interface for LabelTemplate model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";
import { IPrinterSetting, IPrinterSettingProps } from './printer-setting.interface';

interface ICustomerSettingsProps {
    custId?: string,
    partNumber?: string[],
    [x: string]: any
}
export interface ILabelTemplateProps {
    id?: string,
    name?: string,
    path?: string,
    size?: string,
    customerSettings?: ICustomerSettingsProps[],
    printerSettings?: IPrinterSettingProps,
    thumbnail?: {
        mimeType: string,
        base64: string,
        name: string
    }
    version?: string,
    builderMethod?: string,
    apiPath?: string,
    obsoleted?: boolean,
    [x: string]: any
}

interface ILabelTemplateSchema extends IDocument {
    id: string,
    name: string,
    path: string,
    size: string,
    customerSettings: ICustomerSettingsProps[],
    printerSettings: IPrinterSetting,
    thumbnail: {
        mimeType: string,
        base64: string,
        name: string
    }
    version: string,
    builderMethod: string,
    apiPath: string
}

export interface ILabelTemplate extends ILabelTemplateSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}