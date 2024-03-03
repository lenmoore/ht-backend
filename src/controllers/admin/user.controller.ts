import { Request, Response } from 'express';
import { logger } from '../../logger';
import { hash, resFailed, resSuccess } from '../../extras/helpers';
import UserService from '../../services/user.service';
import { UserDocument } from '../../models/user.model';
import TaskService from '../../services/ht/task.service';
import { TaskDocument } from '../../models/ht-custom/task.model';

async function getAllUsers(_: Request, res: Response): Promise<Response> {
    try {
        const users: UserDocument[] = await UserService.getAllUsers();

        if (!users.length) {
            const message: string = 'Users empty';
            return resFailed(res, 200, message);
        }

        const message: string = 'Success get all users';
        return resSuccess(res, 200, message, { users });
    } catch (error: any) {
        logger.error(getAllUsers.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function getUserById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const user: UserDocument | null = await UserService.getOneUserById(id);

        if (!user) {
            const message: string = 'User not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get user by id';
        return resSuccess(res, 200, message, { user });
    } catch (error: any) {
        logger.error(getUserById.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function getUserTasksByName(req: Request, res: Response): Promise<Response> {
    try {
        const tasks: TaskDocument[] | null = await TaskService.getAllTasks({ teamId: req.params._id });

        if (!tasks) {
            const message: string = 'No tasks found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get tasks by user name  ' + req.params.name;
        return resSuccess(res, 200, message, { tasks });
    } catch (error: any) {
        logger.error(getUserById.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { name, phoneNumber, email, password } = req.body;
        const existsUser = await UserService.getOneUser({ $or: [{ phoneNumber }, { email }] });

        if (existsUser) {
            const message: string = 'Username or email already exists';
            return resFailed(res, 400, message);
        }

        const passwordHash = await hash(password);
        const data = { name, phoneNumber, email, password: passwordHash };
        const user: UserDocument = await UserService.createUser(data);

        const message: string = 'Success create new user';
        return resSuccess(res, 201, message, { user });
    } catch (error: any) {
        logger.error(createUser.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function updateUserById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const isExistsUser: UserDocument | null = await UserService.getOneUserById(id);

        if (!isExistsUser) {
            const message: string = 'User not found';
            return resFailed(res, 404, message);
        }

        const { name, phoneNumber, email } = req.body;
        const data = { name, phoneNumber, email };
        const user: UserDocument | null = await UserService.updateOneUserById(id, data);

        const message: string = 'Success update user by id';
        return resSuccess(res, 200, message, { user });
    } catch (error: any) {
        logger.error(updateUserById.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function deleteUserById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const isExistsUser: UserDocument | null = await UserService.getOneUserById(id);

        if (!isExistsUser) {
            const message: string = 'User not found';
            return resFailed(res, 404, message);
        }

        const data = { $pull: { sessions: [] } };
        await UserService.updateOneUserById(id, data);
        await UserService.deleteOneUserById(id);

        const message: string = 'Success delete user by id';
        return resSuccess(res, 200, message);
    } catch (error: any) {
        logger.error(deleteUserById.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

export default { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, getUserTasksByName };
