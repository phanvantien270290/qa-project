/**
 * @owner BlueSky
 * @description Define an Abstraction controller
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import BaseService from '../services/base.service';
import JWTCore from '../cores/lib/json-web-token.lib';
import { API_TOKEN_SECRET } from '../config/config.config';
import AuthMiddleware from '../middlewares/auth.middleware';

export default class BaseController {
    service: BaseService;
    authMiddleware: AuthMiddleware;
    constructor(service: BaseService) {
        this.service = service;
        this.authMiddleware = new AuthMiddleware();
    }

    getParameters(req: Request): ISearchParams {
        let params: ISearchParams = {};
        if (req.query && Object.keys(req.query).length) {
            params = { ...params, ...req.query };

            params.options = params.options && JSON.parse(String(params.options));
            params.searchFields = params.searchFields && JSON.parse(String(params.searchFields));
        } else if (req.body && Object.keys(req.body).length) {
            params = { ...params, ...req.body };
        } else if (req.params && Object.keys(req.params).length) {
            params = { ...params, ...req.params };
        }

        if (params.options && Object.keys(params.options).length) {
            const { page, limit, sort } = params.options;

            params.options.start = +page * +limit;
            params.options.limit = +limit;
            if (sort) {
                for (const field in sort) {
                    sort[field] = (typeof sort[field] === 'string' && sort[field].toLowerCase() === 'asc') ? 1 : -1;
                }
                params.options.sort = sort;
            }
        }
        return params;
    }

    authenticate(req: Request, res: Response, next) {
        const iJWT = new JWTCore(API_TOKEN_SECRET);
        // Express headers are auto converted to lowercase
        let token: any = req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        if (!token) {
            token = this.getParameters(req).token;
        }

        if (!token) {
            res.status(401).send('Authentication error. Token required.');
        } else {
            const valid: any = iJWT.verify(token);
            if (valid.message) {
                res.status(401).send('Authentication error. Token is invalid.');
            } else {
                next();
            }
        }
    }

    authenticateNew(req: Request, res: Response, next) {
        return this.authMiddleware.authenticate4Api(req, res, next);
    }

    find(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        this.service.find(searchParams)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    retrieve(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        this.service.retrieve(searchParams)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    save(req: Request, res: Response) {
        const params: any = this.getParameters(req),
            data = params.data || {};
        this.service.save(data)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    remove(req: Request, res: Response) {
        const searchParams = this.getParameters(req);
        this.service.remove(searchParams)
            .then(resp => {
                res.status(200).send(resp);
            });
    }
}