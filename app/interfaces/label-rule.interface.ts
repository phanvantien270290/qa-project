/**
 * @owner BlueSky
 * @description Define ILabelRule interface for LabelRule model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";

export interface ILabelRuleSchema extends IDocument {
    id: String,
    name: String,
    description: String
}

export interface ILabelRule extends ILabelRuleSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}