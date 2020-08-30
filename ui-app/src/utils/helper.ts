import _ from 'lodash';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

interface requestTypeProps {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string
}
function createRequestTypes(base: string): requestTypeProps {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc: any, type: string) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {})
}

const formatPadStartWithMinMax = (min: number = 0, max: number = 0, padStart: number = 0) => {
    let _min = min.toString().padStart(padStart, "0");
    let _max = max.toString().padStart(padStart, "0");
    return `${_min} / ${_max}`;
}
function isValidDate(d: any) {
    //Object.prototype.toString.call(d) === "[object Date]"
    return d instanceof Date && !isNaN(d as any);
}
const convertParamsToRequest = (params: ISearchParams) => {
    if (typeof params !== 'object') { return params; }

    const { searchFields, searchText, options } = params;
    const searchParams: ISearchParams = {};
    const _searchFields: any = {};

    if (searchFields) {
        for (const [key, value] of Object.entries(searchFields)) {
            if (!value || !isValidDate(value)) {
                continue;
            }
            _searchFields[key] = value;
        }
        if (Object.keys(_searchFields).length > 0) {
            searchParams.searchFields = _searchFields;
        }
    }
    if (searchText) {
        searchParams.searchText = searchText;
    }
    if (options) {
        searchParams.options = options;
    }
    return searchParams;
}
export { createRequestTypes, formatPadStartWithMinMax, convertParamsToRequest, isValidDate }