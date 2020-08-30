/**
 * @owner BlueSky
 * @description Define ILabelOption interface for Item Master model
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";

export interface ILabelOptionProps {
    product?: string,
    description?: string,
    ean?: string,
    sku?: string,
    upc?: string,
    coo?: string[],
    assembled?: string[],
    [key: string]: any
}

export interface ILabelOption extends IDocument {
    product?: String,
    description?: String,
    ean?: String,
    sku?: String,
    upc?: String,
    coo?: Array<String>,
    assembled?: Array<String>,
    [key: string]: any
}