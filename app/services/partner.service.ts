/**
 * @owner BlueSky
 * @description Handle business logic for Partner Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import BaseService, { IService } from './base.service';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { IRepository } from '../repositories/base.repository';

export interface IPartnerService extends IService {
    getListPartnerCombobox: (searchParams: any, filterOptios: FilterOption) => any;
}

export default class PartnerService extends BaseService {
    constructor(repository: IRepository) {
        super(repository);
    }
}