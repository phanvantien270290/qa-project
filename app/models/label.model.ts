/**
 * @owner BlueSky
 * @description Store the machine information which preresented as a Label
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { ILabel } from "../interfaces/label.interface";
import { LABEL_RULE } from '../utils/enum.util';

const name = "Label";
const labelSchema = new Schema({
    labelRule: { type: LABEL_RULE },
    itemMasterId: { type: Schema.Types.ObjectId, ref: 'ItemMaster' },
    partNumber: { type: String },
    partnerId: { type: Number },
    custId: { type: String },
    serialNumber: { type: String },
    oemSerialNumber: { type: String },
    macAddress: { type: String, uppercase: true },
    printedBy: { type: String },
    printedAt: { type: Date },
    option: { type: Schema.Types.Mixed },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: name
});
labelSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
labelSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default model<ILabel>(name, labelSchema);