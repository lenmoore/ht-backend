import { FilterQuery } from 'mongoose';
import TaskModel, { TaskDocument } from '../../models/ht-custom/task.model';

async function getAllTasks(filter: FilterQuery<TaskDocument> = {}): Promise<TaskDocument[]> {
    return TaskModel.find(filter).populate('sceneId');
}

async function createTask(data: TaskDocument | object): Promise<TaskDocument> {
    return await TaskModel.create(data);
}

async function getOneTaskById(id: string): Promise<TaskDocument | null> {
    return TaskModel.findById(id);
}

async function updateOneTaskById(id: string, data: object): Promise<TaskDocument | null> {
    return TaskModel.findByIdAndUpdate(id, data, { new: true });
}

async function deleteOneTaskById(id: string): Promise<TaskDocument | null> {
    return TaskModel.findByIdAndDelete(id);
}

export default {
    createTask,
    deleteOneTaskById,
    getAllTasks,
    getOneTaskById,
    updateOneTaskById,
};