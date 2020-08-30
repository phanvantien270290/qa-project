/**
 * @owner BlueSky
 * @description Define manipulations onto Printer collection
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import Printer from '../models/printer.model';
import BaseRepository from './base.repository';

export default class PrinterRepository extends BaseRepository {
    constructor() {
        super(Printer, null);
    }
}