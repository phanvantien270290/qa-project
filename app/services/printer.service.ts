/**
 * @owner BlueSky
 * @description Handle business logic for Printer Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import BaseService, { IService } from './base.service';
import { IRepository } from '../repositories/base.repository';

export interface IPrinterService extends IService { }

export default class PrinterService extends BaseService {
    constructor(repository: IRepository) {
        super(repository);
    }
}