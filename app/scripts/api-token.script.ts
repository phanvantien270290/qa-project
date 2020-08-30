/**
 * @owner BlueSky
 * @description Define a script to generate a token based on Json Web Token library for APP
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import JWTCore from '../cores/lib/json-web-token.lib';
import { API_TOKEN_SECRET } from 'app/config/config.config';

export function generate(id: string, tool?: string, protocol?: string) {
    const jwt = new JWTCore(API_TOKEN_SECRET);
    return jwt.define({ id, tool, protocol });
}

// console.log("API Token = ", generate('AUTO_TOOL', 'LMS', 'HTTP_Trigger'));