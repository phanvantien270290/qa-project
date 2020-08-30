/**
 * @owner BlueSky
 * @description Define manipulations onto Label collection
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import Label from '../models/label.model';
import BaseRepository, { IRepository } from './base.repository';
import { LookupOption } from '../interfaces/mongo-option/lookup-option.interface';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';

export interface ILabelRepository extends IRepository {
    getFulLabels(searchParams: any, filterOption: FilterOption);
}

export default class LabelRepository extends BaseRepository implements ILabelRepository {
    constructor() {
        super(Label, null);
    }

    getFulLabels(searchParams: any = {}, filterOption: FilterOption = {}) {
        const lookupOption: LookupOption = {
            from: 'ItemMaster',
            foreignField: '_id',
            localField: 'itemMasterId',
            as: 'labelsettings'
        };

        return this.aggregate(
            searchParams,
            {
                _id: { _id: '$_id' },
                serialNumber: { $first: '$serialNumber' },
                custId: { $first: '$custId' },
                labelRule: { $first: '$labelRule' },
                itemMasterId: { $first: '$itemMasterId' },
                partId: { $first: '$partId' },
                partNumber: { $first: '$partNumber' },
                partnerId: { $first: '$partnerId' },
                oemSerialNumber: { $first: '$oemSerialNumber' },
                option: { $first: '$option' }
            },
            filterOption, lookupOption
        );
    }
}