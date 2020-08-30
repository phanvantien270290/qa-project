/**
 * @owner BlueSky
 * @description Initialize the app routers
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import LabelRouter from "./label.router";
import PrinterRouter from "./printer.router";
import LabelTemplateRouter from './label-template.router';
import SwaggerRouter from './swagger.router';
import APITokenRouter from './api-token.router';
import PartnerRouter from './partner.router';
import ItemMasterRouter from './item-master.router';

const requireAuthetication = (req, res, next) => {
    next();
};

const requireAuthorization = (req, res, next) => {
    next();
};

export const registerRouter = (appExpress) => {
    appExpress.all('/api/*', requireAuthetication, requireAuthorization);

    const ItemMasterRtr = new ItemMasterRouter(appExpress);
    ItemMasterRtr.onInit();

    const LabelRtr = new LabelRouter(appExpress);
    LabelRtr.onInit();

    const PrinterRtr = new PrinterRouter(appExpress);
    PrinterRtr.onInit();

    const PartnerRtr = new PartnerRouter(appExpress);
    PartnerRtr.onInit();

    const LabelTemplateRtr = new LabelTemplateRouter(appExpress);
    LabelTemplateRtr.onInit();

    const ApiTokenRtr = new APITokenRouter(appExpress);
    ApiTokenRtr.onInit();

    const SwaggerRtr = new SwaggerRouter(appExpress);
    SwaggerRtr.onInit();
};
