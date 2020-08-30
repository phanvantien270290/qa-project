/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import PrinterContainer from '../containers/printer.container';
import { PrinterContextProvider } from '../store/context';
// export const PrinterContext = React.createContext({ searchParams: {} });

export default function PrinterPage() {
    return (
        <PrinterContextProvider >
            <PrinterContainer />
        </PrinterContextProvider>

    );
}