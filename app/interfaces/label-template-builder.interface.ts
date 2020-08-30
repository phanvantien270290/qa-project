/**
 * @owner BlueSky
 * @description Define a template builder to build data structures for concrete templates
 * @since 1.0.0
 * @date Mar 24, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IPelcoModelTemplate } from "./template-model/pelco-model-template.interface";
import { IPelcoSHBTemplate } from './template-model/pelco-shb-template.interface';
import { IPelco7050MFFTemplate } from './template-model/pelco-7050mff-template.interface';

export interface ILabelTemplateBuilder {
    buildPelcoModelTemplate(label: any, settings: any, option: any): IPelcoModelTemplate
    buildPelcoSHBTemplate(label: any, settings: any, option: any): IPelcoSHBTemplate
    buildPelco7050MffTemplate(label: any, settings: any, option: any): IPelco7050MFFTemplate
}