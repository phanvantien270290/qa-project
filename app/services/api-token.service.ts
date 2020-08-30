/**
 * @owner BlueSky
 * @description Handle business logic for API Token Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import APITokenRepository from '../repositories/api-token.repository';
import BaseService from './base.service';

export default class APITokenService extends BaseService {
    constructor(repository: APITokenRepository) {
        super(repository);
    }
}