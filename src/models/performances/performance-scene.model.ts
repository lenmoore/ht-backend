import mongoose from 'mongoose';
import moment from 'moment';
import { SceneDocument } from './scene.model';

export interface PerformanceSceneDocument extends mongoose.Document {
    _id: string;
    sceneStarted: moment.Moment;
    sceneEnded: moment.Moment;
    sceneId: string;
    performanceId: string;
    actorUserId: string;
    teamUserId: string;
    taskId: string;
    scene: SceneDocument;
}

const performanceSceneSchema = new mongoose.Schema({
        sceneStarted: { type: Date, required: false },
        sceneEnded: { type: Date, required: false },
        sceneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene' },
        performanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Performance' },
        actorUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
        teamUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    });

const PerformanceSceneModel = mongoose.model<PerformanceSceneDocument>('PerformanceScene', performanceSceneSchema);
export default PerformanceSceneModel;

