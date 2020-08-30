/**
 * @owner BlueSky
 * @description Define a session for APP
 * @since 1.0.0
 * @date May 14, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import crypto from 'crypto';
import dotenv from 'dotenv';
import RedisCore from './redis.lib';
import JWTCore from './json-web-token.lib';

dotenv.config();
const SESSION_KEY = process.env.SESSION_KEY || 'APP.SESSION';
const SESSION_TIMEOUT = process.env.SESSION_TIMEOUT || 12; //Hours


interface IUser {
    name: string;
    email: string;
    createdAt?: string;
    exp?: number;
}

export default class Session {
    private db: RedisCore;
    constructor() {
        this.db = new RedisCore(process.env.REDIS_HOST || 'localhost', Number(process.env.REDIS_PORT || 6379));
    }

    async set(info: IUser, device: string = '') {
        const appSession = await this.get(),
            token = crypto.randomBytes(64).toString('base64');

        const _info: ISession = {
            token: '',
            salt: crypto.randomBytes(16).toString('hex'),
            device
        };

        info.createdAt = new Date().toISOString();
        info.exp = this.setExpired(Number(SESSION_TIMEOUT));

        const jwt = new JWTCore(_info.salt);
        _info.token = jwt.define(info);

        appSession[token] = _info

        this.db.setJson(SESSION_KEY, appSession);
        return token;
    }

    async update(token: string) {
        const appSession = await this.get();
        if (!appSession || !appSession[token]) {
            return false;
        }
        const curSession = appSession[token];
        const jwt = new JWTCore(curSession.salt);
        const user: IUser = jwt.decode(curSession.token);
        user.createdAt = new Date().toISOString();
        user.exp = this.setExpired(Number(SESSION_TIMEOUT));

        curSession.token = jwt.define(user);
        appSession[token] = curSession;

        this.db.setJson(SESSION_KEY, appSession);

        return true;
    }

    async validate(token: string) {
        const appSession = await this.get();
        if (!appSession || !appSession[token]) {
            return false;
        }
        const curSession = appSession[token];
        const jwt = new JWTCore(curSession.salt);
        const abc: any = jwt.verify(curSession.token);

        if (abc.message) {
            delete appSession[token];
            this.db.setJson(SESSION_KEY, appSession);
            return false;
        }

        return this.update(token);
    }

    async destroy(token: string) {
        const appSession = await this.get();
        if (!appSession || !appSession[token]) {
            return true;
        }

        delete appSession[token];
        this.db.setJson(SESSION_KEY, appSession);
        return true;
    }

    get(): Promise<IAppSession> {
        return this.db.getJson(SESSION_KEY);
    }

    private setExpired(hourNo: number): number {
        const date = new Date();
        date.setHours(hourNo);
        return Math.floor(date.getTime() / 1000);
    }

    async getCurrents(): Promise<IUser[]> {
        const appSession = this.get();
        if (!appSession) return null;

        const users: IUser[] = [];
        for (const token in appSession) {
            const info: ISession = appSession[token];
            const jwt = new JWTCore(info.salt);
            const user: IUser = jwt.decode(info.token);
            users.push(user);
        }
        return users;
    }
}
