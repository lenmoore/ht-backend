import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import TodoModel, { TodoDocument } from '../../mongo/models/example/todo.model';

async function getAllTodos(filter: FilterQuery<TodoDocument> = {}): Promise<TodoDocument[]> {
    return await TodoModel.find(filter);
}

async function getOneTodoById(id: string | mongoose.Types.ObjectId): Promise<TodoDocument | null> {
    return await getOneTodo({ _id: id });
}

async function getOneTodo(
    filter: FilterQuery<TodoDocument> = {},
    selectedField: string = '',
): Promise<TodoDocument | null> {
    return TodoModel.findOne(filter, selectedField);
}

async function createOneTodo(
    data: TodoDocument | object,
): Promise<TodoDocument> {
    return await TodoModel.create(data);
}

async function updateOneTodoById(id: string | mongoose.Types.ObjectId, data: UpdateQuery<TodoDocument>):
    Promise<TodoDocument | null> {
    return TodoModel.findByIdAndUpdate(id, data);
}

async function updateOneTodo(filter: FilterQuery<TodoDocument>, data: UpdateQuery<TodoDocument> = {}): Promise<any> {
    return TodoModel.updateOne(filter, data);
}

async function deleteOneTodoById(id: string | mongoose.Types.ObjectId): Promise<TodoDocument | null> {
    return TodoModel.findByIdAndDelete(id);
}

async function deleteOneTodo(filter: FilterQuery<TodoDocument>): Promise<any> {
    return TodoModel.deleteOne(filter);
}

export default {
    getAllTodos,
    getOneTodo,
    getOneTodoById,
    createOneTodo,
    updateOneTodoById,
    updateOneTodo,
    deleteOneTodoById,
    deleteOneTodo,
};