/**
 * @owner BlueSky
 * @description API Token which will provide tokens to other apps, which want to access via API
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model, Model } from 'mongoose';
import crypto from 'crypto';
import { IAPIToken, IToken } from "../interfaces/api-token.interface";
import JWTCore from '../cores/lib/json-web-token.lib';

const apiTokenSchema = new Schema({
    id: { type: String },
    salt: { type: String },
    token: { type: String },
    app: { type: String, unique: true, uppercase: true },
    expiredAt: { type: Date, default: new Date().setDate(new Date().getDate() + 1) },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'ApiToken'
});
apiTokenSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
apiTokenSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};
apiTokenSchema.methods.verifyToken = function (token: string) {
    const jwt = new JWTCore(this.salt);
    return jwt.verify(token, 'HS512');
};

apiTokenSchema.post<any>('save', function (doc, next) {
    doc.salt = crypto.randomBytes(16).toString('hex');

    const jwt = new JWTCore(doc.salt);
    const jwtState: IToken = {
        id: doc._id,
        client: doc.app,
        exp: Math.floor(new Date(doc.expiredAt).getTime() / 1000)
    };

    doc.token = jwt.define(jwtState, 'HS512');
    doc.updateOne({ token: doc.token, salt: doc.salt }, { w: 1, upsert: false }, (err, aa) => {

    });
    next();
});

export interface APITokenModel extends Model<IAPIToken> {
    verifyToken(token: string): Promise<boolean>
}

export default model<IAPIToken, APITokenModel>("APIToken", apiTokenSchema)