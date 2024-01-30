import { Request, Response } from 'express';
import { resSuccess } from '../extras/helpers';

function index(_: Request, res: Response): Response {
    const message = 'Lets make some theatre!';
    return resSuccess(res, 200, message, {
        docs: 'https://github.com/kochan4php/express-ts-starter',
    });
}

export default { index };
