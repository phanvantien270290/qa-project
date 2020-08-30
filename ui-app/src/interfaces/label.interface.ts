import { IPrinterSetting } from "./printer-setting.interface";

export interface ILabel {
    _id?: string;
    labelRule?: "NONE" | "CURRENT_DATE" | "INCREMENT",
    itemMasterId?: object | null,
    partNumber?: string,
    partnerId?: number,
    custId?: string,
    serialNumber?: string,
    oemSerialNumber?: string,
    option?: any,
    obsoleted?: boolean;
    deleted?: boolean;
    [x: string]: any;
}
export type ILabelNullable = ILabel | null;