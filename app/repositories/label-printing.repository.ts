/**
 * @owner BlueSky
 * @description Define manipulations onto Label collection
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import LabelPrinting from '../models/label-printing.model';
import BaseRepository from './base.repository';

export default class LabelPrintingRepository extends BaseRepository {
    constructor() {
        super(LabelPrinting, null);
    }
}