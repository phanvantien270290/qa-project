/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { createContext } from 'react'

export interface IFortinetContextProps {
    searchParams?: ISearchParams;
}
const initFortinetParams: IFortinetContextProps = {
    searchParams: {
        searchFields: {},
        searchText: '',
        options: { page: 0, limit: 10 }
    }
};
const FortinetContext = createContext({});

const FortinetContextProvider = (props: any) => {
    return (
        <FortinetContext.Provider value={initFortinetParams}>
            {props.children}
        </FortinetContext.Provider >
    )
}
export { FortinetContextProvider, FortinetContext, initFortinetParams };