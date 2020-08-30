/**
 * @owner BlueSky
 * @description Define a template builder to build data structures for concrete templates
 * @since 1.0.0
 * @date Mar 24, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { ILabelTemplateBuilder } from '../interfaces/label-template-builder.interface';
import { IPelcoModelTemplate } from '../interfaces/template-model/pelco-model-template.interface';
import { IPelcoSHBTemplate } from '../interfaces/template-model/pelco-shb-template.interface';
import { IPelco7050MFFTemplate } from '../interfaces/template-model/pelco-7050mff-template.interface';
import { ITemplateModel } from '../interfaces/template-model/template-model.interface';
import PelcoSHBEntity from '../cores/entities/pelco-shb.entity';
import PelcoModelEntity from '../cores/entities/pelco-model.entity';
import Pelco7050MFFEntity from '../cores/entities/pelco-7050mff.entity';
import { IPrinterSetting } from '../interfaces/printer-setting.interface';
import { ILabelOption } from '../interfaces/label-option.interface';

export default class TemplateModelService implements ILabelTemplateBuilder {

    constructor(private templateId: string, private templatePath: string, private builderMethod: string) {

    }

    buildPelcoModelTemplate(label: any, settings: IPrinterSetting, labelOption: ILabelOption, option: any = {}): IPelcoModelTemplate {
        return new PelcoModelEntity(label, settings, labelOption, this.templateId, this.templatePath)
            .toObject(option);
    }

    buildPelcoSHBTemplate(label: any, settings: IPrinterSetting, labelOption: ILabelOption, option: any = {}): IPelcoSHBTemplate {
        return new PelcoSHBEntity(label, settings, labelOption, this.templateId, this.templatePath)
            .toObject(option);
    }

    buildPelco7050MffTemplate(label: any, settings: IPrinterSetting, labelOption: ILabelOption, option: any = {}): IPelco7050MFFTemplate {
        return new Pelco7050MFFEntity(label, settings, labelOption, this.templateId, this.templatePath)
            .toObject(option);
    }

    buildTemplate(label: any, settings: IPrinterSetting, labelOption: ILabelOption, option: any = {}): ITemplateModel {
        if (this[this.builderMethod]) {
            return this[this.builderMethod](label, settings, labelOption, option);
        }
        return null;
    }
}