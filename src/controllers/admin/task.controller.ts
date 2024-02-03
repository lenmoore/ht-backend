import { resFailed, resSuccess } from '../../extras/helpers';
import { TaskDocument } from '../../models/ht-custom/task.model';
import TaskService from '../../services/ht/task.service';
import { Request, Response } from 'express';


async function getAllTasks(_: Request, res: Response): Promise<Response> {
    try {
        const tasks: TaskDocument[] = await TaskService.getAllTasks();

        if (!tasks.length) {
            const message: string = 'tasks empty';
            return resFailed(res, 200, message);
        }

        const message: string = 'Success get all tasks';
        return resSuccess(res, 200, message, { tasks });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function getTaskById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const task: TaskDocument | null = await TaskService.getOneTaskById(id);

        if (!task) {
            const message: string = 'task not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get task by id';
        return resSuccess(res, 200, message, { task });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function createTask(req: Request, res: Response): Promise<Response> {
    try {
        const { title, description, orderNumber, teams, sceneId } = req.body;
        const data = { title, description, orderNumber, teams, sceneId };
        const task: TaskDocument = await TaskService.createTask(data);

        const message: string = 'Success create new task';
        return resSuccess(res, 201, message, { task });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function updateTaskById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const data = req.body;
        const task: TaskDocument | null = await TaskService.updateOneTaskById(id, data);

        if (!task) {
            const message: string = 'task not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success update task by id';
        return resSuccess(res, 200, message, { task });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function deleteTaskById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const task: TaskDocument | null = await TaskService.deleteOneTaskById(id);

        if (!task) {
            const message: string = 'task not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success delete task by id';
        return resSuccess(res, 200, message, { task });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
};