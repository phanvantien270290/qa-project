/**
 * @owner BlueSky
 * @description Define Redis library for APP
 * @since 1.0.0
 * @date May 14, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { createClient } from 'redis';

export default class RedisCore {
    private client: any;
    constructor(private host: string, private port: number) {
        this.client = createClient(this.port, this.host);
    }

    async setText(name: string, value: string) {
        return await this.client.set(name, value, (err, reply) => err || true);
    }

    async getText(name: string) {
        return await this.client.get(name, (err, reply) => err || reply);
    }

    async setJson(name: string, json: any) {
        return this.client.hmset(name, json, (err, reply) => err || true);
    }

    async getJson(name: string) {
        return this.client.hgetall(name, (err, json) => err || json);
    }

    async remove(name: string) {
        return this.client.del(name, (err) => err || true);
    }

    async flush() {
        return await this.client.flushdb();
    }
}