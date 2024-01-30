import { UserDocument } from '../user.model';
import { PhaseDocument } from './phase.model';
import mongoose from 'mongoose';

export interface ActorInput {
    userId: UserDocument['_id'];
    name: string;
    phases: PhaseDocument[];
}

export interface ActorDocument extends ActorInput {
    refreshToken: string;
    userId: UserDocument['_id'];
}

const actorSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        phases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
    },
    {
        timestamps: true,
    });

const ActorModel = mongoose.model<ActorDocument>('Actor', actorSchema);
export default ActorModel;
