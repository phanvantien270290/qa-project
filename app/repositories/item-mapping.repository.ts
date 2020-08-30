/**
 * @owner BlueSky
 * @description Define manipulations onto Item Mapping collection
 * @since 1.0.0
 * @date Apr 09, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import ItemMapping from '../models/external/item-mapping-external.model';
import BaseRepository from './base.repository';

export default class ItemMappingRepository extends BaseRepository {
    constructor() {
        super(ItemMapping, null);
    }
}