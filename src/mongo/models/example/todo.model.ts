import mongoose from 'mongoose';
import { UserDocument } from '../user.model';

export interface TodoDocument extends mongoose.Document {
    refreshToken: string;
    userId: UserDocument['_id'];
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    userAgent: string;
}

const todoSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
        userAgent: { type: String },
    },
    {
        timestamps: true,
    },
);

const TodoModel = mongoose.model<TodoDocument>('Todo', todoSchema);
export default TodoModel;