/**
 * @owner BlueSky
 * @description Handle business logic for Label Template Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import LabelTemplateRepository from '../repositories/label-template.repository';
import BaseService, { IService } from './base.service';

export interface ILabelTemplateService extends IService { }

export default class LabelTemplateService extends BaseService {
    constructor(repository: LabelTemplateRepository) {
        super(repository);
    }
}