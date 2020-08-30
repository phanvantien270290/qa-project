/**
 * @owner BlueSky
 * @description Define IPrinter interface for Printer model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";
export interface IPrinterProps {
    _id?: string,
    id?: string,
    name?: string,
    driver?: string,
    location?: string,
    dpi?: number,
    connection?: string,
    paperSize?: string,
    cutter?: string,
    darkness?: {
        min: number,
        max: number
    },
    speed?: {
        min: number,
        max: number
    },
    status?: string,
    teardown?: number,
    [x: string]: any

}
interface IPrinterSchema extends IDocument {
    id: String,
    name: String,
    driver: String,
    location: String,
    dpi: Number,
    connection: String,
    paperSize: String,
    cutter: String,
    darkness: {
        min: Number,
        max: Number
    },
    speed: {
        min: Number,
        max: Number
    },
    status: String,
    teardown: Number
}

export interface IPrinter extends IPrinterSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}