/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React, { useState } from 'react';
import propTypes from 'prop-types';
import { ItemComponent } from './item.component';

interface ItemProps {
    data: Array<any>
}

export const ListComponent = ({ data }: ItemProps) => {
    const [displayMode, setDisplayMode] = useState(true);
    const items = data.map((item, index) =>
        <ItemComponent key={index} title={item.partNumber} desc={item.serialNumber || ''} grid={displayMode}></ItemComponent>
    );

    function setMode(mode: boolean, event: any) {
        setDisplayMode(mode);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 my-3">
                    <div className="pull-right">
                        <div className="btn-group">
                            <button className="btn btn-info" onClick={setMode.bind(null, false)}>List View</button>
                            <button className="btn btn-danger" onClick={setMode.bind(null, true)}>Grid View</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="products" className="row view-group">
                {items}
            </div>
        </div>
    );
}

ListComponent.propTypes = {
    data: propTypes.array.isRequired
}