/**
 * @owner BlueSky
 * @description Define manipulations onto MongoDB collection
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Model } from "mongoose";
import { FilterOption } from "../interfaces/mongo-option/filter-option.interface";
import { LookupOption } from '../interfaces/mongo-option/lookup-option.interface';
import { CustomResponse } from "../interfaces/custom-response.interface";
import { DELETE_MSG } from '../utils/message.util';

export interface IRepository {
    aggregate(searchParams, group, option: FilterOption, lookup: LookupOption): Promise<CustomResponse>;
    find(searchParams, options: FilterOption): Promise<CustomResponse>;
    paginate(searchParams: any, option: FilterOption): Promise<CustomResponse>;
    save(data, option: FilterOption): Promise<CustomResponse>;
    update(searchParams, data, option: FilterOption): Promise<CustomResponse>;
    updateOne(searchParams, data, option: FilterOption): Promise<CustomResponse>;
    history(data: any): Promise<CustomResponse>;
    retrieve(searchParams, option: FilterOption): Promise<CustomResponse>;
    remove(searchParams, force: boolean): Promise<CustomResponse>;
    deleteOne(searchParams: any, force: boolean): Promise<CustomResponse>;
    findAndUpdate(searchParams, data, option: FilterOption): Promise<CustomResponse>;
}

export default class BaseRepository implements IRepository {
    // [x: string]: any;
    entity: Model<any>;
    entityHistory: Model<any>;
    constructor(entity: Model<any>, entityHistory: Model<any> = null) {
        this.entity = entity;
        this.entityHistory = entityHistory;
    }

    aggregate(searchParams, group, option: FilterOption = {}, lookup: LookupOption = null): Promise<CustomResponse> {
        return new Promise((resolve) => {
            const eModel = this.entity.aggregate();
            eModel.match(searchParams).group(group);
            if (option.sort) {
                eModel.sort(option.sort);
            }
            if (option.start) {
                eModel.skip(option.start);
            }
            if (option.limit) {
                eModel.limit(option.limit);
            }
            if (lookup) {
                eModel.lookup(lookup);
            }

            eModel.exec((err, res) => {
                if (err || !res.length) {
                    resolve({ status: false, msg: err ? err.message : 'Data not found' });
                } else {
                    resolve({ status: true, data: res });
                }
            })
        });
    }

    find(searchParams, options: FilterOption = {}): Promise<CustomResponse> {
        return new Promise((resolve) => {
            const eModel = this.entity.find({ deleted: false, ...searchParams });
            if (options.fields) {
                eModel.select(options.fields);
            }
            if (options.sort) {
                eModel.sort(options.sort);
            }
            if (options.start) {
                eModel.skip(options.start);
            }
            if (options.limit) {
                eModel.limit(options.limit);
            }
            eModel.exec((err, res) => {
                if (err || !res.length) {
                    resolve({ status: false, msg: err ? err.message : 'Data not found' });
                } else {
                    resolve({ status: true, data: res });
                }
            })
        });
    }

    paginate(searchParams: any = {}, option: FilterOption = {}, lookup: LookupOption = null): Promise<CustomResponse> {
        return new Promise((resolve) => {
            try {
                const { sort, start = 0, limit = 0, fields } = option;
                const _searchParams = { deleted: false, ...searchParams };
                const total = [{ "$group": { "_id": null, "count": { "$sum": 1 } } }];
                const $facet: any = { "data": [], "totalCount": total };

                if (sort) {
                    $facet.data.push({ $sort: sort })
                }
                if (start > -1) {
                    $facet.data.push({ $skip: start })
                }
                if (limit > 0) {
                    $facet.data.push({ $limit: limit })
                }
                if (fields && Object.keys(fields).length > 0) {
                    $facet.data.push({ '$project': fields })
                }
                const query: object[] = [{ "$match": _searchParams }, { "$facet": $facet }];
                if (lookup) {
                    query.unshift({ '$lookup': lookup });
                }

                const eModel = this.entity.aggregate(query);
                eModel.exec((err, [{ data, totalCount }]: any) => {
                    if (err || !data.length) {
                        resolve({ status: false, msg: err ? err.message : 'Data not found' });
                    } else {
                        resolve({ status: true, data, total: totalCount[0].count });
                    }
                })
            } catch (error) {
                resolve({ status: false, msg: error ? error.message : 'Data not found' });
            }

        });
    }

    save(data, option: FilterOption = {}): Promise<CustomResponse> {
        if (!option) option = {};
        return new Promise((resolve) => {
            if (Array.isArray(data)) {
                option.safe = true;
                this.entity.insertMany(data, { ...option, rawResult: true }, (err, raw) => {
                    if (err || !raw.length) {
                        resolve({ status: false, msg: err ? err.message : 'No data inserted' });
                    } else {
                        resolve({ status: true, msg: 'Inserted successfully', data: raw });
                    }
                });
            } else {
                this.entity.create([data], { ...option }, (err, raw) => {
                    if (err || !raw) {
                        resolve({ status: false, msg: err ? err.message : 'No data inserted' });
                    } else {
                        resolve({ status: true, msg: 'Inserted successfully', data: raw });
                    }
                })
            }
        });
    }

    update(searchParams, data, option: FilterOption = {}): Promise<CustomResponse> {
        if (!option) option = {};
        Object.assign(option, { safe: true });

        return new Promise((resolve) => {
            this.entity.updateMany(searchParams, { $set: data }, option, (err, raw) => {
                if (err || !raw.n) {
                    resolve({ status: false, msg: err ? err.message : 'No data updated' });
                } else {
                    resolve({ status: true, msg: 'Updated successfully' });
                }
            });
        });
    }

    updateOne(searchParams, data = {}, option: FilterOption = {}): Promise<CustomResponse> {
        if (!option) option = {};
        Object.assign(option, { safe: true });
        return new Promise((resolve) => {
            this.entity.updateOne(searchParams, { $set: data }, option, (err, raw) => {
                if (err || !raw.n) {
                    resolve({ status: false, msg: err ? err.message : 'No data updated' });
                } else {
                    resolve({ status: true, msg: 'Updated successfully' });
                }
            });
        });
    }

    history(data: any = {}): Promise<CustomResponse> {
        return new Promise((resolve) => {
            data.updatedAt = new Date();
            delete data._id;
            delete data._v;

            const eHis = new this.entityHistory(data);
            eHis.save(function (err) {
                if (err) {
                    resolve({ status: false, msg: err.message });
                } else {
                    resolve({ status: true, id: eHis._id });
                }
            });
        });
    }

    retrieve(searchParams, option: FilterOption = {}): Promise<CustomResponse> {
        return new Promise((resolve) => {
            const eModel = this.entity.findOne(searchParams);
            if (option.fields) {
                eModel.select(option.fields);
            }
            if (option.sort) {
                eModel.sort(option.sort);
            }
            eModel.exec((err, res) => {
                if (err || !res) {
                    resolve({ status: false, msg: err ? err.message : 'Data not found' });
                } else {
                    resolve({ status: true, data: res.toObject() });
                }
            });
        });
    }

    /**
     * remove is a deprecated function and has been replaced by deleteOne() (to delete a single document) and deleteMany() (to delete multiple documents)
     * @param searchParams conditions to filter document
     * @param force  true is delete document else update {deleted : true} in document
     */
    remove(searchParams, force = false): Promise<CustomResponse> {
        return new Promise((resolve) => {
            if (force) {
                this.entity.remove(searchParams, (err) => {
                    resolve({ status: err ? false : true, msg: err ? err.message : 'Deleted sucessfully.' });
                });
            } else {
                this.update(searchParams, { deleted: true }, { multi: true }).then((res) => {
                    resolve({ status: res.status, msg: res.status ? 'Deleted sucessfully.' : res.msg });
                });
            }
        });
    }

    /**
     * @param searchParams  conditions to filter the document
     * @param force  true value  is delete document else update {deleted : true} in document
     */
    deleteOne(searchParams: any, force: boolean = false): Promise<CustomResponse> {
        return new Promise((resolve) => {
            if (force) {
                this.entity.deleteOne(searchParams).exec((err, res) => {
                    let msgConfig: CustomResponse = { status: res.n !== 0, msg: DELETE_MSG.success }
                    if (res.n === 0) {
                        msgConfig.msg = err ? err.message : DELETE_MSG.error;
                    }
                    resolve(msgConfig);
                });
            } else {
                this.updateOne(searchParams, { deleted: true }).then((res) => {
                    resolve({ status: res.status, msg: res.status ? DELETE_MSG.success : res.msg });
                })
            }
        });
    }

    findAndUpdate(searchParams, data, option: FilterOption = {}): Promise<CustomResponse> {
        return new Promise(resolve => {
            this.entity.findOneAndUpdate(searchParams, { $set: data }, option)
                .exec((err, res) => {
                    if (err || !res) {
                        resolve({ status: false, msg: err ? err.message : 'Data not found' });
                    } else {
                        resolve({ status: true, data: res.toObject() });
                    }
                });
        });
    }
}
