/**
 * @owner BlueSky
 * @description Implement the Pelco Model template
 * @since 1.0.0
 * @date Mar 25, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IPelcoModelTemplate } from '../../interfaces/template-model/pelco-model-template.interface';
import { ILabel } from '../../interfaces/label.interface';
import { IPrinterSetting } from '../../interfaces/printer-setting.interface';
import { ILabelOption } from '../../interfaces/label-option.interface';

export default class PelcoModelEntity {
    constructor(
        private label: ILabel,
        private settings: IPrinterSetting,
        private option: ILabelOption,
        private templateId: String,
        private templatePath: String
    ) {

    }

    toObject(option: any = {}): IPelcoModelTemplate {
        const modelBox: IPelcoModelTemplate = {
            product: this.option.product || '',
            model: this.label.partNumber,
            description: this.option.description || '',
            oemSerialNumber: this.label.oemSerialNumber || '',
            chassisSerialNumber: this.label.serialNumber || '',
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
        return modelBox;
    }
}