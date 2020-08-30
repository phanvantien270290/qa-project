/**
 * @owner BlueSky
 * @description Implement the Pelco SHB template
 * @since 1.0.0
 * @date Mar 25, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { IPelcoSHBTemplate } from '../../interfaces/template-model/pelco-shb-template.interface';
import { ILabel } from '../../interfaces/label.interface';
import { IPrinterSetting } from '../../interfaces/printer-setting.interface';
import { ILabelOption } from '../../interfaces/label-option.interface';

export default class PelcoSHBEntity {
    constructor(
        private label: ILabel,
        private settings: IPrinterSetting,
        private option: ILabelOption,
        private templateId: String,
        private templatePath: String
    ) {

    }

    toObject(option: any = {}): IPelcoSHBTemplate {
        const shbBox: IPelcoSHBTemplate = {
            product: this.option.product || '',
            description: this.option.description || '',
            assembled: (Array.isArray(this.option.assembled) && this.option.assembled.length) ? this.option.assembled[0] : '',
            oemSerialNumber: this.label.oemSerialNumber || '',
            model: this.label.partNumber || '',
            templateName: this.templateId,
            templatePath: this.templatePath,
            printerName: this.settings.id,
            accountName: option.accountName || '',
            darkness: this.settings.darkness,
            speed: this.settings.speed,
            copies: this.settings.copies,
            teardown: this.settings.teardown,
            offsetX: this.settings.offset.x,
            offsetY: this.settings.offset.y,
            numberOfLabel: option.numberOfLabel || 1,
        };
        return shbBox;
    }
}