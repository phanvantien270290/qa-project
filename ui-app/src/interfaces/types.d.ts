/**
 * @owner BlueSky
 * @description Define global objects - Not need to import for using
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

interface IResponse<rowData> {
    msg?: string;
    status?: boolean;
}
interface IGetListResp<rowData> extends IResponse {
    data: rowData[];
    totalCount?: number;
    loading: boolean;
}

interface IGetOneResp<rowData> extends IResponse {
    data: rowData;
    loading?: boolean;
}

interface IState {
    nav: any;
    dashboard: any;
    printer: IGetListResp<IPrinter>;
    labelTemplate: {
        getOne: IGetOneResp<ILabelTemplate>;
        getList: IGetListResp<ILabelTemplate>;
    };
    partner: {
        getCombobox: IGetListResp<IItemMaster>;
    };
    itemMaster: {
        getCombobox: IGetListResp<IItemMaster>;
    };
    fortinet: {
        getList: IGetListResp<IItemmaster>;
        getOne: IGetOneResp<IItemmaster>;
    }
}

interface IAction {
    type: string;
    payload: any;
}

interface INavItem {
    label: string;
    name: string;
    path?: string;
    children?: INavItem[];
    hidden?: boolean;
}

interface IUser {
    id: string;
    name: string;
    account: string;
    email: string;
    role: string;
}

interface IGetListParams extends ISearchParams {
    [props: string | number]: any;
}

interface IFindOneParams {
    _id: string;
}

interface ISearchParams {
    searchFields?: {
        [prop: string]: any;
    };
    searchText?: string;
    options?: {
        [prop: string]: any;
        limit?: number;
        page?: number;
        sort?: {
            [prop: string]: any;
        };
    };
    [key: string]: any
}

interface ICRUDParameter<T = null> {
    _id?: string;
    data?: T | null;
    [key: string]: any;
}

type IActionTypes = 'create' | 'edit' | 'view';
