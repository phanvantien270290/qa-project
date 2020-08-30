/**
 * @owner BlueSky
 * @description Define manipulations onto Label Template collection
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import LabelTemplate from '../models/label-template.model';
import BaseRepository from './base.repository';

export default class LabelTemplateRepository extends BaseRepository {
    constructor() {
        super(LabelTemplate, null);
    }

}