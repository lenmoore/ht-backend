import { Request, Response } from 'express';
import { createUser } from '../service/user.service';
import logger from '../utils/logger';

export async function createUserHandler(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request,
    res: Response,
) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
}
