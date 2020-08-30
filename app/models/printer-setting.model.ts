/**
 * @owner BlueSky
 * @description Define printer setting for Label Templates
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema } from 'mongoose';

export const PrinterSettingSchema = new Schema({
    id: String,//id printer
    name: String,//name printer
    copies: Number,
    darkness: Number,
    speed: Number,
    teardown: Number,
    tearoff: Number,
    offset: {
        x: Number,
        y: Number
    },
    autoCalibrate: Boolean
});