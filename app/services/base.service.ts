/**
 * @owner BlueSky
 * @description Define a general business logic
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IRepository } from '../repositories/base.repository';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { LookupOption } from '../interfaces/mongo-option/lookup-option.interface';
import { CustomResponse } from '../interfaces/custom-response.interface';

export interface IService {
    repository: IRepository;
    find(searchParams, option?: FilterOption): Promise<CustomResponse>;
    paginate(searchParams, option?: FilterOption): Promise<CustomResponse>;
    retrieve(searchParams, option?: FilterOption): Promise<CustomResponse>;
    aggregate(searchParams, group, option?: FilterOption, lookup?: LookupOption): Promise<CustomResponse>;
    save(data, option?: FilterOption): Promise<CustomResponse>;
    remove(searchParams, force?: boolean): Promise<CustomResponse>;
    deteleOne(searchParams, force?: boolean): Promise<CustomResponse>;
    updateOne(searchParams, data, options?: FilterOption): Promise<CustomResponse>;
    findAndUpdate(searchParams, data, option?: FilterOption): Promise<CustomResponse>;
}
export default class BaseService implements IService {
    repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }

    find(searchParams, option: FilterOption = {}) {
        return this.repository.find(searchParams, option);
    }

    paginate(searchParams, option: FilterOption = {}) {
        return this.repository.paginate(searchParams, option);
    }

    retrieve(searchParams, option: FilterOption = {}) {
        return this.repository.retrieve(searchParams, option);
    }

    aggregate(searchParams, group, option: FilterOption = {}, lookup: LookupOption = null) {
        return this.repository.aggregate(searchParams, group, option, lookup);
    }

    save(data, option: FilterOption = {}) {
        return this.repository.save(data, option);
    }

    remove(searchParams, force: boolean = false) {
        return this.repository.remove(searchParams, force);
    }

    deteleOne(searchParams, force: boolean = false) {
        return this.repository.deleteOne(searchParams, force);
    }

    updateOne(searchParams, data, options: FilterOption = {}) {
        return this.repository.updateOne(searchParams, data, options)
    }

    findAndUpdate(searchParams, data, option: FilterOption = {}) {
        return this.repository.findAndUpdate(searchParams, data, option);
    }
}