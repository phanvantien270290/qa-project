/**
 * @owner BlueSky
 * @description Define IPartner interface for Partner model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";

export interface IPartnerProps {
    id?: number,
    custId?: string,
    company?: string,
    deleted?: boolean,
    obsoleted?: boolean
}

export interface IPartnerSchema extends IDocument {
    id?: Number,
    custId?: String,
    company?: String,
}

export interface IPartner extends IPartnerSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}