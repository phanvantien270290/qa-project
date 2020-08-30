/**
 * @owner BlueSky
 * @description Define a private router to App
 * @since 1.0.0
 * @date May 07, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isLogged } from '../services/session.service';

const PrivateRoute: React.FC = ({ children, ...rest }) => {
    const isAuthenticated = isLogged();
    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    isAuthenticated ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
            }
        />
    );
}

export default PrivateRoute;