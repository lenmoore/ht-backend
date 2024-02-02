import { UserDocument } from '../user.model';
import { SceneDocument } from './scene.model';
import mongoose from 'mongoose';

export interface PerformanceDocument extends mongoose.Document {
    refreshToken: string;
    userId: UserDocument['_id'];
    title: string;
    date: Date;
    description: string;
    phases: SceneDocument[];
}

const performanceSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        date: { type: Date, required: true },
        description: { type: String, required: true },
        phases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
    },
    {
        timestamps: true,
    });

const PerformanceModel = mongoose.model<PerformanceDocument>('Performance', performanceSchema);
export default PerformanceModel;