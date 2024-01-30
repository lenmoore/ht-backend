import { Response } from 'express';

export function resSuccess(res: Response, status: number, message: string, data?: object | any): Response {
    return res.status(status).type('application/json').json({ success: true, message, data });
}

export function resFailed(res: Response, status: number, message: string, error?: object | any): Response {
    return res.status(status).type('application/json').json({ success: false, message, error });
}
