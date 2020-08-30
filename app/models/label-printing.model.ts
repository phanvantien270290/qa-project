/**
 * @owner BlueSky
 * @description The data which exported via a physical Printer
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { ILabelPrinting } from "../interfaces/label-printing.interface";

const name = "LabelPrinting";
const labelPrintingSchema = new Schema({
    labelId: { type: Schema.Types.ObjectId, ref: 'Label' },
    label: { type: Schema.Types.Mixed },
    templateId: { type: Schema.Types.ObjectId, ref: 'LabelTemplate' },
    template: { type: Schema.Types.Mixed },
    printerName: { type: String },
    reprinted: { type: Boolean },
    printedBy: { type: String },
    printedAt: { type: Date, default: Date.now },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: name
});
labelPrintingSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
labelPrintingSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default model<ILabelPrinting>(name, labelPrintingSchema);