import mongoose from 'mongoose';
import { UserDocument } from '../user.model';

export interface TeamInput {
    userId: UserDocument['_id'];
    name: string;
    hex: string;

}

export interface TeamDocument extends TeamInput, mongoose.Document {
    refreshToken: string;
    userId: UserDocument['_id'];
}

const teamSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        hex: { type: String, required: true },
    },
    {
        timestamps: true,
    });

const TeamModel = mongoose.model<TeamDocument>('Team', teamSchema);
export default TeamModel;