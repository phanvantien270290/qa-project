/**
 * @owner BlueSky
 * @description Define data structure for Pelco 7050MFF
 * @since 1.0.0
 * @date Mar 31, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { ITemplateModel } from "./template-model.interface";

export interface IPelco7050MFFTemplate extends ITemplateModel {
    product: String,
    sku: String,
    ean: String,
    model: String,
    description: String,
    oemSerialNumber: String,
    assembled: String,
    templateName: String,
    templatePath: String,
    printerName: String,
    accountName: String,
    darkness: Number,
    speed: Number,
    copies: Number,
    teardown: Number,
    offsetX: Number,
    offsetY: Number
}