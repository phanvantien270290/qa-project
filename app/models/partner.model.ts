/**
 * @owner BlueSky
 * @description The master data which cloned from SPIDER-2
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { IPartner } from "../interfaces/partner.interface";

const name = "Partner";
const partnerSchema = new Schema({
    id: { type: Number },
    custId: { type: String },
    company: { type: String },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: name
});
partnerSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
partnerSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default model<IPartner>(name, partnerSchema);