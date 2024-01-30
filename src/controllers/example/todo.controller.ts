import { Request, Response } from 'express';
import { resFailed, resSuccess } from '../../extras/helpers';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import TodoService from '../../services/example/todo.service';

async function addTodo(req: Request, res: Response): Promise<Response> {
    try {
        const { title, description } = req.body;

        const todo = await TodoService.createOneTodo({
            title,
            description,
        });

        const message = 'Add todo success';
        return resSuccess(res, 200, message, todo);
    } catch (error: any) {
        logger.error(addTodo.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function getOneTodo(
    req: Request,
    res: Response,
): Promise<Response> {
    try {
        const { id } = req.params;
        const todo = await TodoService.getOneTodoById(id);

        if (!todo) {
            const message = 'Todo not found';
            return resFailed(res, 404, message);
        }

        const message = 'Get todo success';
        return resSuccess(res, 200, message, todo);
    } catch (error: any) {
        logger.error(getOneTodo.name, error.message);
        return resFailed(res, 500, error.message);
    }
}


async function getAllTodos(req: Request, res: Response): Promise<Response> {
    try {
        const todos = await TodoService.getAllTodos();
        const message = 'Get all todos success';
        return resSuccess(res, 200, message, todos);
    } catch (error: any) {
        logger.error(getAllTodos.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function updateTodo(
    req: Request,
    res: Response,
): Promise<Response> {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const todo = await TodoService.updateOneTodoById(id, {
            title,
            description,
            completed,
        });

        if (!todo) {
            const message = 'Todo not found';
            return resFailed(res, 404, message);
        }

        const message = 'Update todo success';
        return resSuccess(res, 200, message, todo);
    } catch (error: any) {
        logger.error(updateTodo.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

async function deleteTodo(
    req: Request,
    res: Response,
): Promise<Response> {
    try {
        const { id } = req.params;
        const todo = await TodoService.deleteOneTodoById(id);

        if (!todo) {
            const message = 'Todo not found';
            return resFailed(res, 404, message);
        }

        const message = 'Delete todo success';
        return resSuccess(res, 200, message, todo);
    } catch (error: any) {
        logger.error(deleteTodo.name, error.message);
        return resFailed(res, 500, error.message);
    }
}

export default { addTodo, getAllTodos, deleteTodo, getOneTodo, updateTodo };