import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
    refreshToken: string;
    userId: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
    admin: UserDocument['admin'];
}

const sessionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        valid: { type: Boolean, default: true },
        admin: { type: Boolean },
        userAgent: { type: String },
    },
    {
        timestamps: true,
    },
);

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;