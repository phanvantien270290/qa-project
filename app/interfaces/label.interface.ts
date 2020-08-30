/**
 * @owner BlueSky
 * @description Define Label interface for Label model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";
import { Schema } from "mongoose";
import { LABEL_RULE } from '../utils/enum.util';
export interface ILabelProps {
    labelRule?: LABEL_RULE;
    itemMasterId?: string;
    partNumber?: string;
    partnerId?: number;
    custId?: string;
    macAddress?: string;
    serialNumber?: string;
    oemSerialNumber?: string;
    printedBy?: string;
    printedAt?: Date;
    option?: any;
}

interface ILabelSchema extends IDocument {
    labelRule: LABEL_RULE;
    itemMasterId: Schema.Types.ObjectId;
    partNumber: String;
    partnerId: Number;
    macAddress: String;
    custId: String;
    serialNumber: String;
    oemSerialNumber: String;
    printedBy: String;
    printedAt: Date;
    option: Schema.Types.Mixed;
}

export interface ILabel extends ILabelSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}