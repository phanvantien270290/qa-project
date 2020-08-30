/**
 * @owner BlueSky
 * @description Define a rule for generating a OEM serial number
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { ILabelRule } from "../interfaces/label-rule.interface";

const name = "LabelRule";
const labelRuleSchema = new Schema({
    id: { type: String },
    name: { type: String },
    description: { type: String },
    obsoleted: { type: Boolean, default: false, enum: [true, false] },
    deleted: { type: Boolean, default: false, enum: [true, false] }
}, {
    timestamps: true,
    collection: name
});
labelRuleSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
labelRuleSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default model<ILabelRule>(name, labelRuleSchema);