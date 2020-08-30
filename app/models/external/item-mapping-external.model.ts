/**
 * @owner BlueSky
 * @description This is one of mastered data which stored the Item Master cloned from SPIDER-2
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema } from 'mongoose';
import { IItemMapping } from "../../interfaces/item-mapping.interface";
import { createDBConnection, MASTER_CONNECTION } from '../../config/mongo-connection.config';
import dotenv from "dotenv";
dotenv.config();
const mappingConnection = createDBConnection(MASTER_CONNECTION, { authSource: process.env.MGDB_MASTER_DATABASE_DEFAULT || 'metadata' });

const itemMappingSchema = new Schema({
    inventoryId: { type: String },
    partNumber: { type: String },
    description: { type: String },
    manfPartNumeber: { type: Schema.Types.Array },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'ItemMapping'
});
itemMappingSchema.methods.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
itemMappingSchema.methods.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default mappingConnection.model<IItemMapping>('ItemMapping', itemMappingSchema);