/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import LabelTemplateContainer from '../containers/label.container';
import { LabelTemplateContextProvider } from '../store/context';

export default function LabelTemplatePage() {
    return (
        <LabelTemplateContextProvider >
            <LabelTemplateContainer />
        </LabelTemplateContextProvider>

    );
}