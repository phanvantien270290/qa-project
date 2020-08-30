/**
 * @owner BlueSky
 * @description The routers for App
 * @since 1.0.0
 * @date May 05, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { HomeComponent } from '../components/home.component';
import { PageNotFound } from '../components/page-not-found.component';
import Dashboard from '../modules/dashboard/pages/dashboard.page';
import PrinterPage from '../modules/printer/pages/printer.page';
import LabelTemplatePage from '../modules/label-template/pages/label.page';
import FortinetPage from '../modules/fortinet/pages/fortinet.page';
export const Routers = [
    {
        path: '/',
        exact: true,
        component: HomeComponent
    }, {
        path: '/dashboard',
        // exact: true,
        private: false,
        component: Dashboard,
    },{
        path: '/manage/fortinet',
        // exact: true,
        private: false,
        component: FortinetPage
    }, {
        path: '/manage/printer',
        // exact: true,
        private: false,
        component: PrinterPage
    },{
        path: '/manage/label/template',
        // exact: true,
        private: false,
        component: LabelTemplatePage
    }, {
        path: '*',
        component: PageNotFound
    }
];