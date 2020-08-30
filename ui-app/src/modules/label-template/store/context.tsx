/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { createContext } from 'react'

export interface ILabelTemplateContextProps {
    searchParams?: ISearchParams;
}
const initLabelTemplateParams: ILabelTemplateContextProps = {
    searchParams: {
        searchFields: {},
        searchText: '',
        options: { page: 0, limit: 10 }
    }
};
const LabelTemplateContext = createContext({});

const LabelTemplateContextProvider = (props: any) => {
    return (
        <LabelTemplateContext.Provider value={initLabelTemplateParams}>
            {props.children}
        </LabelTemplateContext.Provider >
    )
}
export { LabelTemplateContextProvider, LabelTemplateContext, initLabelTemplateParams };