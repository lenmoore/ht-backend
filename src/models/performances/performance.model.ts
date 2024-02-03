import { SceneDocument } from './scene.model';
import mongoose from 'mongoose';

export interface PerformanceDocument extends mongoose.Document {
    title: string;
    date: Date;
    isActive: boolean;
    startedAt: Date;
    endedAt: Date;
    description: string;
    scenes: SceneDocument[];
}

const performanceSchema = new mongoose.Schema({
        title: { type: String, required: true },
        date: { type: Date, required: true },
        isaActive: { type: Boolean, default: false },
        startedAt: { type: Date, required: false },
        endedAt: { type: Date, required: false },
        description: { type: String, required: true },
        scenes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
    },
    {
        timestamps: true,
    });

const PerformanceModel = mongoose.model<PerformanceDocument>('Performance', performanceSchema);
export default PerformanceModel;