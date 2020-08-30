/**
 * @owner BlueSky
 * @description Handle business logic for Label Rule Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import LabelRuleRepository from '../repositories/label-rule.repository';
import BaseService from './base.service';

export default class LabelRuleService extends BaseService {
    constructor(repository: LabelRuleRepository) {
        super(repository);
    }
}