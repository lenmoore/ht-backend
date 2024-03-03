import { SceneDocument } from '../performances/scene.model';
import { UserDocument } from '../user.model';
import mongoose from 'mongoose';

export interface TaskInput {
    orderNumber: number;
    name: string;
    description: string;

    mediaType: string; // 'teleprompter', 'video_silent', 'soundscape'
    duration: number; // seconds

    sceneId: SceneDocument['_id'];
    team: UserDocument['_id'];

    isActive: boolean;
    isConfirmedByTeam: boolean;
    fileName: string;
}

export interface TaskDocument extends TaskInput, mongoose.Document {
    refreshToken: string;
}

const taskSchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        orderNumber: { type: Number, required: true },
        sceneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene' },
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isActive: { type: Boolean, default: false },
        isConfirmedByTeam: { type: Boolean, default: false },
        mediaType: { type: String, required: true },
        fileName: { type: String, required: true },
    },
    {
        timestamps: true,
    });

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
export default TaskModel;