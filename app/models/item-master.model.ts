/**
 * @owner BlueSky
 * @description This is one of mastered data which stored the Item Master cloned from SPIDER-2
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { IItemMaster } from "../interfaces/item-master.interface";
import { LabelOptionSchema } from './label-option.model';

const itemMasterSchema = new Schema({
    id: { type: Number },
    partNumber: { type: String },
    description: { type: String },
    labelInformation: LabelOptionSchema,
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'ItemMaster'
});
itemMasterSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
itemMasterSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default model<IItemMaster>('ItemMaster', itemMasterSchema);