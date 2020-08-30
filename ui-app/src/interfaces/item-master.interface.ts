import { ILabelOption } from "./label-option.interface";

export interface IItemMaster {
    _id?: string;
    partNumber?: string;
    custId?: string;
    labelInformation?: ILabelOption;
    obsoleted?: boolean;
    deleted?: boolean;
    [x: string]: any;
}
export type IItemMasterNullable = IItemMaster | null;