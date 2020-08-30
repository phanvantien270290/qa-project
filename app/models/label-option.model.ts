/**
 * @owner BlueSky
 * @description Define label option model for Item master model
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema } from 'mongoose';

export const LabelOptionSchema = new Schema({
    product: String,
    description: String,
    ean: String,
    sku: String,
    upc: String,
    coo: Schema.Types.Array,
    assembled: Schema.Types.Array
});