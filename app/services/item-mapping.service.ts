/**
 * @owner BlueSky
 * @description Handle business logic for Item Mapping Object
 * @since 1.0.0
 * @date Apr 09, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import ItemMappingRepository from '../repositories/item-mapping.repository';
import BaseService from './base.service';

export default class ItemMappingService extends BaseService {
    constructor(repository: ItemMappingRepository) {
        super(repository);
    }
}