/**
 * @owner BlueSky
 * @description ...
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import BaseController from "./base.controller";
import APITokenService from '../services/api-token.service';

export default class APITokenController extends BaseController {
    constructor(service: APITokenService) {
        super(service);
    }
}