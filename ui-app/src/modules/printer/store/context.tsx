/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { createContext } from 'react'

export interface IPrinterContextProps {
    searchParams?: ISearchParams;
}
const initPrinterParams: IPrinterContextProps = {
    searchParams: {
        searchFields: {},
        searchText: '',
        options: { page: 0, limit: 10 }
    }
};
const PrinterContext = createContext({});

const PrinterContextProvider = (props: any) => {
    return (
        <PrinterContext.Provider value={initPrinterParams}>
            {props.children}
        </PrinterContext.Provider >
    )
}
export { PrinterContextProvider, PrinterContext, initPrinterParams };