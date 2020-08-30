/**
 * @owner BlueSky
 * @description Define IPrinterSetting interface for Label Template model
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";

export interface IPrinterSettingProps {
    id?: string,
    name?: string,
    copies?: number,
    darkness?: number,
    speed?: number,
    teardown?: number,
    offset?: {
        x: number,
        y: number
    },
    autoCalibrate?: boolean
}

export interface IPrinterSetting extends IDocument {
    id: String,
    name: String,
    copies: Number,
    darkness: Number,
    speed: Number,
    teardown: Number,
    offset: {
        x: Number,
        y: Number
    },
    autoCalibrate: Boolean
}