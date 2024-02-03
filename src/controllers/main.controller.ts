import { Request, Response } from 'express';
import { resFailed, resSuccess } from '../extras/helpers';
import { UserDocument } from '../models/user.model';
import UserService from '../services/user.service';

function index(_: Request, res: Response): Response {
    const message = 'Lets make some theatre!';
    return resSuccess(res, 200, message, {
        docs: 'https://github.com/kochan4php/express-ts-starter',
    });
}


async function getAllTeamsInGroup(req: Request, res: Response): Promise<Response> {
    try {
        console.log('get teams:', req.query);
        const group = req.query.groupName;
        const users: UserDocument[] = await UserService.getAllUsers({
            group_name: group,
            actor: false,
            admin: false,
        });


        if (!users.length) {
            const message: string = 'teams empty';
            return resFailed(res, 200, message);
        }

        const message: string = 'Success get group teams';
        return resSuccess(res, 200, message, users);
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

export default { index, getAllTeamsInGroup };
