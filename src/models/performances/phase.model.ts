import mongoose from 'mongoose';
import { UserDocument } from '../user.model';
import { TaskDocument } from '../ht-custom/task.model';

interface PhaseInput {
    title: string;
    orderNumber: number;
    tasks: TaskDocument[];
}

export interface PhaseDocument extends PhaseInput, mongoose.Document {
    refreshToken: string;
    userId: UserDocument['_id'];
}

const phaseSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        orderNumber: { type: Number, required: true },
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    },
    {
        timestamps: true,
    });

const PhaseModel = mongoose.model<PhaseDocument>('Phase', phaseSchema);
export default PhaseModel;