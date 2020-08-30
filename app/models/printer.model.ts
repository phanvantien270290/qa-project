/**
 * @owner BlueSky
 * @description Store printers' data
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { IPrinter } from "../interfaces/printer.interface";

const nameCollection = 'Printer';
const printerSchema = new Schema({
    id: String,
    name: { type: String },
    driver: { type: String },
    location: { type: String },
    dpi: { type: Number },
    connection: { type: String },
    paperSize: { type: String },
    cutter: { type: String },
    status: { type: String, default: 'ACTIVE' },
    darkness: {
        min: Number,
        max: Number
    },
    speed: {
        min: Number,
        max: Number
    },
    teardown: Number,
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: nameCollection
});

printerSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
printerSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};
printerSchema.index({ id: 1 }, { unique: true })

export default model<IPrinter>(nameCollection, printerSchema);