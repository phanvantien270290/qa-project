/**
 * @owner BlueSky
 * @description Rendering the app routers
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routers } from '../routers/index.router';
import PrivateRoute from './private-route.component';

export const RouterComponent = () => {

    return (
        <Switch>
            {
                Routers.map((item, index) => {
                    if (item.private) {
                        const rest = {
                            exact: item.exact || false,
                            path: item.path
                        };
                        return (
                            <PrivateRoute key={index} {...rest}>
                                <item.component />
                            </PrivateRoute>
                        );
                    }
                    return (
                        <Route key={index} exact={item.exact || false} path={item.path} component={item.component}></Route>
                    )
                })
            }
        </Switch>
    );
}