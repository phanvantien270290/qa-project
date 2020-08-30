/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import propTypes from 'prop-types';

interface ItemProps {
    title: string,
    desc: string,
    grid: boolean
}

export const ItemComponent = ({ title, desc, grid = true }: ItemProps) => {
    const mode = grid ? 'grid-group-item' : 'grid-group-item list-group-item';
    return (
        <div className={`item col-xs-4 col-lg-4 ${mode}`}>
            <div className="thumbnail card">
                <div className="img-event">
                    <img className="group list-group-image img-fluid" src="http://placehold.it/400x250/000/fff" alt="" />
                </div>
                <div className="caption card-body">
                    <h4 className="group card-title inner list-group-item-heading">{title}</h4>
                    <p className="group inner list-group-item-text">{desc}</p>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <button className="btn btn-success">PRINT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ItemComponent.propTypes = {
    title: propTypes.string.isRequired,
    desc: propTypes.string.isRequired,
    grid: propTypes.bool
}

ItemComponent.defaultTypes = {
    grid: true
}