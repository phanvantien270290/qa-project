/**
 * @owner BlueSky
 * @description Define connections for MongoDB
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const CLABEL_CONNECTION: string
    = [
        "mongodb://",
        process.env.MGDB_CLABEL_USERNAME,
        `:${process.env.MGDB_CLABEL_PASSWORD}`,
        `@${process.env.MGDB_CLABEL_HOST}`,
        `:${process.env.MGDB_CLABEL_PORT}`,
        `/${process.env.MGDB_CLABEL_DATABASE}`,
    ].join('');
export const MASTER_CONNECTION: string
    = `mongodb://${process.env.MGDB_MASTER_USERNAME}:${process.env.MGDB_MASTER_PASSWORD}@${process.env.MGDB_MASTER_HOST}:${process.env.MGDB_MASTER_PORT}/${process.env.MGDB_MASTER_DATABASE}`;
export const OPTION_CONNECTION = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    authSource: process.env.MGDB_CLABEL_DATABASE_DEFAULT || 'admin'
};
export function initDBConnection(): void {
    mongoose.connect(CLABEL_CONNECTION, OPTION_CONNECTION, (err) => {

    });
};
export function createDBConnection(connectionString, option = {}): Connection {
    return mongoose.createConnection(connectionString, { ...OPTION_CONNECTION, ...option });
};