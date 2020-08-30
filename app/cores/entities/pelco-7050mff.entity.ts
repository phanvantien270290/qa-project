/**
 * @owner BlueSky
 * @description Implement the Pelco 7050MFF template
 * @since 1.0.0
 * @date Mar 31, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { IPelco7050MFFTemplate } from '../../interfaces/template-model/pelco-7050mff-template.interface';
import { ILabel } from '../../interfaces/label.interface';
import { IPrinterSetting } from '../../interfaces/printer-setting.interface';
import { ILabelOption } from '../../interfaces/label-option.interface';

export default class Pelco7050MFFEntity {
    constructor(
        private label: ILabel,
        private settings: IPrinterSetting,
        private option: ILabelOption,
        private templateId: String,
        private templatePath: String
    ) {

    }

    toObject(option: any = {}): IPelco7050MFFTemplate {
        const shbBox: IPelco7050MFFTemplate = {
            product: this.option.product || '',
            sku: this.option.sku || '',
            ean: this.option.ean || '',
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