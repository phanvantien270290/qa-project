/**
 * @owner BlueSky
 * @description Define Document interface for others
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Document } from "mongoose";

export interface IDocument extends Document {
    deleted: Boolean,
    obsoleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
}