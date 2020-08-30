/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import FortinetContainer from '../containers/fortinet.container';
import { FortinetContextProvider } from '../store/context';

export default function FortinetPage() {
    return (
        <FortinetContextProvider >
            <FortinetContainer />
        </FortinetContextProvider>

    );
}