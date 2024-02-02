import { PhaseDocument } from '../performances/phase.model';
import { TeamDocument } from '../performances/team.model';
import { UserDocument } from '../user.model';
import mongoose from 'mongoose';

export interface TaskInput {
    name: string;
    description: string;
    duration: number; // seconds
    orderNumber: number;
    tasks: TaskDocument[];
    phaseId: PhaseDocument['_id'];
    teamId: TeamDocument['_id'];
    mediaType: string; // 'teleprompter', 'video_silent', 'soundscape'
    fileName: string;
    // for example if it is 'file123' then the file will be saved as 'YYYY-MM-DD_phasename_teamname_file123.mp4'
    // todo this is not sure actually. idk
}

export interface TaskDocument extends TaskInput, mongoose.Document {
    refreshToken: string;
    userId: UserDocument['_id'];
}

const taskSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        orderNumber: { type: Number, required: true },
        phaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase' },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        mediaType: { type: String, required: true },
        fileName: { type: String, required: true },
    },
    {
        timestamps: true,
    });

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
export default TaskModel;