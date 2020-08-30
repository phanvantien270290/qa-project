/**
 * @owner BlueSky
 * @description Define IItemMaster interface for ItemMaster model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";
import { ILabelOption, ILabelOptionProps } from './label-option.interface';

export interface IItemMasterProps {
    id?: number,
    partNumber?: string,
    description?: string,
    labelInformation?: ILabelOptionProps,
    deleted?: boolean,
    obsoleted?: boolean
}
interface IItemMasterSchema extends IDocument {
    id: Number,
    partNumber: String,
    description: String,
    labelInformation: ILabelOption
}

export interface IItemMaster extends IItemMasterSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}