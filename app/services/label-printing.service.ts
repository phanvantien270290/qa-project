/**
 * @owner BlueSky
 * @description Handle business logic for Label Printing Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import LabelPrintingRepository from '../repositories/label-printing.repository';
import BaseService from './base.service';

export default class LabelPrintingService extends BaseService {
    constructor(repository: LabelPrintingRepository) {
        super(repository);
    }

}