/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 09, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { Request, Response } from 'express';
import { CustomResponse } from '../interfaces/custom-response.interface';
import APITokenService from '../services/api-token.service';
import APITokenRepository from '../repositories/api-token.repository';
import APITokenModel from '../models/api-token.model';
import Session from '../cores/lib/session.lib';

export default class AuthMiddleware {
    service: APITokenService
    constructor() {
        this.service = new APITokenService(new APITokenRepository());
    }

    private retrieveToken(req: Request): string {
        // Express headers are auto converted to lowercase
        let token: any = req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        return token;
    }

    async authenticate4Api(req: Request, res: Response, next) {
        const token = this.retrieveToken(req),
            resp: CustomResponse = {
                status: false
            };
        if (!token) {
            resp.msg = 'Authentication error. Token required.';
        } else {
            const apires = await this.service.retrieve({ token, obsoleted: false, deleted: false });
            if (apires.data) {
                const api = new APITokenModel(apires.data);
                const result = api.verifyToken(token);
                if (result.message) {
                    resp.msg = 'Authentication error. Token is invalid.';
                }
            } else {
                resp.msg = apires.msg;
            }
        }

        if (resp.msg) {
            res.status(401).send(resp);
        } else {
            next();
        }
    }

    async authenticate4App(req: Request, res: Response, next) {
        const token = this.retrieveToken(req),
            resp: CustomResponse = {
                status: false
            };
        if (!token) {
            resp.msg = 'Authentication error. Token required.';
        } else {
            const session = new Session();
            const isAliveSession = await session.validate(token);
            if (!isAliveSession) {
                resp.msg = 'Authentication error. Token is invalid or expired.';
            }
        }

        if (resp.msg) {
            res.status(401).send(resp);
        } else {
            next();
        }
    }
}