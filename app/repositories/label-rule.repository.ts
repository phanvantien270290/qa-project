/**
 * @owner BlueSky
 * @description Define manipulations onto Label Rule collection
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import LabelRule from '../models/label-rule.model';
import BaseRepository from './base.repository';

export default class LabelRuleRepository extends BaseRepository {
    constructor() {
        super(LabelRule, null);
    }
}