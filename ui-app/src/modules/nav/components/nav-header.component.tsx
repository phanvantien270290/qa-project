/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NavHeader = ({ path = '/', name = '', logo = '' }) => {
    return (
        <div>
            <Navbar.Brand>
                <Link className="header-title" to={`${path}`} >
                    <img className="header-logo" src={`${logo}`} alt={`${name}`} height='65vh' width='65vh' />
                    {name}
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </div>
    );
}

NavHeader.propTypes = {
    path: PropTypes.string,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
};

export default NavHeader;