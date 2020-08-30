/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
// import logo from '../../../logo.svg';
import '../assets/app.css';
import Navigation from '../../nav/pages/nav.page';
// import { RouterComponent } from '../../../components/router.component';

const App = () => {
    return (
        <div className="App">
            <Navigation></Navigation>
        </div>
    );
};
export default App;