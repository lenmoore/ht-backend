import { NextFunction, Response } from 'express';
import IRequest from '../interfaces/i-request';
import { resFailed } from '../helpers';
import UserModel from '../../models/user.model';

export default async function isAdmin(req: IRequest, res: Response, next: NextFunction): Promise<void | Response> {
    const user = await UserModel.findOne({ _id: req.user?.id });
    if (user?.admin === true) {
        next();
        return;
    }

    return resFailed(res, 403, 'Forbidden');
}
