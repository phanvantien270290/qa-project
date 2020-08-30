/**
 * @owner BlueSky
 * @description Define ILabelPrinting interface for LabelPrinting model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";
import { Schema } from "mongoose";

interface ILabelPrintingSchema extends IDocument {
    labelId: Schema.Types.ObjectId,
    label: Schema.Types.Mixed,
    templateId: Schema.Types.ObjectId,
    template: Schema.Types.Mixed,
    printerName: String,
    reprinted: Boolean,
    printedBy: String,
    printedAt: Date
}

export interface ILabelPrinting extends ILabelPrintingSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}