import { NextFunction, Response } from 'express';
import IRequest from '../interfaces/i-request';
import { getUserPayloadFromAccessToken, verifyAccessToken } from './jwt/helpers/access-token.helper';
import { resFailed } from '../helpers';
import { logger } from '@typegoose/typegoose/lib/logSettings';

export default async function auth(req: IRequest, res: Response, next: NextFunction): Promise<void | Response> {
    try {
        console.log('trying to authorise', req.body);
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token);
        if (!token) return resFailed(res, 401, 'Token invalid');

        try {
            await verifyAccessToken(token);
            console.log(token);
            const decoded = getUserPayloadFromAccessToken(token) as any;
            console.log(decoded);
            req.user = decoded;

            next();
            return;
        } catch (error: any) {
            logger.error(auth.name, error.message);
            return resFailed(res, 401, 'Token invalid');
        }
    } catch (error: any) {
        logger.error(auth.name, error.message);
        return resFailed(res, 401, 'Unauthorized');
    }
}
