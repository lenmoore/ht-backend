import { NextFunction, Response } from 'express';
import IRequest from '../interfaces/i-request';
import { resFailed } from '../helpers';

export default async function isAdmin(req: IRequest, res: Response, next: NextFunction): Promise<void | Response> {
    if (req.user?.role.toLowerCase() === 'admin') {
        next();
        return;
    }

    return resFailed(res, 403, 'Forbidden');
}
