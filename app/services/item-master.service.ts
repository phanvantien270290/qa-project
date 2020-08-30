/**
 * @owner BlueSky
 * @description Handle business logic for Item Master Object
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <phong.lam@ccintegration.com>
 */
import BaseService, { IService } from './base.service';
import { IRepository } from '../repositories/base.repository';

export interface IItemMasterService extends IService { }

export default class ItemMasterService extends BaseService {
    constructor(repository: IRepository) {
        super(repository);
    }
}