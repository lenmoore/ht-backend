import mongoose from 'mongoose';
import { UserDocument } from '../user.model';
import { TaskDocument } from '../ht-custom/task.model';

interface SceneInput {
    title: string;
    orderNumber: number;
    description: string;
    groupName: string;
    isActive: boolean;
    tasks: TaskDocument[];
    teams: UserDocument[];
}

export interface SceneDocument extends SceneInput, mongoose.Document {
    refreshToken: string;
    userId: UserDocument['_id'];
}

const sceneSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        groupName: { type: String, required: true },
        orderNumber: { type: Number, required: true },
        isActive: { type: Boolean, default: false },
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    });

const SceneModel = mongoose.model<SceneDocument>('Scene', sceneSchema);
export default SceneModel;