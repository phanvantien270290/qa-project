import { IPrinterSetting } from "./printer-setting.interface";

export interface ILabelTemplate {
    _id?: string;
    id?: string;
    name?: string;
    path?: string;
    size?: string;
    customerSettings?: { custId: string; partNumber: string[] }[];
    printerSettings?: IPrinterSetting;
    thumbnail?: {
        mimeType?: string;
        base64?: string;
        name?: string;
    };
    version?: string;
    builderMethod?: string;
    apiPath?: string;
    obsoleted?: boolean;
    deleted?: boolean;
    [x: string]: any;
}
export type ILabelTemplateNullable = ILabelTemplate | null;