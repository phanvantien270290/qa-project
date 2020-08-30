/**
 * @owner BlueSky
 * @description Define templates for printing labels
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { ILabelTemplate } from "../interfaces/label-template.interface";
import { PrinterSettingSchema } from './printer-setting.model';

const nameCollection = "LabelTemplate";

const labelTemplateSchema = new Schema({
    id: { type: String },
    name: { type: String },
    path: { type: String },
    size: { type: String },
    customerSettings: [{
        _id: false,
        custId: { type: String },
        partNumber: { type: Array }
    }],
    printerSettings: PrinterSettingSchema,
    thumbnail: {
        mimeType: String,
        base64: String,
        name: String
    },
    version: { type: String },
    builderMethod: { type: String },
    apiPath: { type: String },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: nameCollection
});
labelTemplateSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
labelTemplateSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};
labelTemplateSchema.index({ id: 1 }, { unique: true })
export default model<ILabelTemplate>(nameCollection, labelTemplateSchema);
export type ILabelTemplateTypes = ILabelTemplate