/**
 * @owner BlueSky
 * @description Define IItemMapping interface for IItemMapping model.
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";

interface IItemMappingSchema extends IDocument {
    inventoryId: String,
    partNumber: String,
    description: String,
    manfPartNumeber: Array<any>
}

export interface IItemMapping extends IItemMappingSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}