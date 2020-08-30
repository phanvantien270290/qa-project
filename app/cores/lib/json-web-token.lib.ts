/**
 * @owner BlueSky
 * @description Define Json Web Token library for APP
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import JWT, { Algorithm } from "jsonwebtoken";

export default class JWTCore {
    constructor(private secret: string) {
        this.secret = secret;
    }

    define(data: any, algorithm: Algorithm = 'HS512'): string {
        return JWT.sign(data, this.secret, { algorithm });
    }

    verify(token: string, algorithm: Algorithm = 'HS512'): string | object {
        try {
            return JWT.verify(token, this.secret, { algorithms: [algorithm] });
        } catch (error) {
            return error;
        }
    }

    decode(token: string): any {
        try {
            return JWT.decode(token, { complete: true, json: true });
        } catch (error) {
            return error;
        }
    }
}