import { Request, Response } from 'express';
import { resSuccess } from '../extras/helpers';
import { logger } from '../logger';

function healthCheck(_: Request, res: Response): Response {
    const health = {
        status: 'UP',
        uptime: process.uptime(),
        timestamp: Date.now(),
    };

    try {
        return resSuccess(res, 200, 'Health check success', health);
    } catch (error: any) {
        logger.error(healthCheck.name, error.message);
        return resSuccess(res, 500, error.message);
    }
}

export default { healthCheck };
