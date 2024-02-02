import { PhaseDocument } from '../performances/phase.model';
import { TeamDocument } from '../performances/team.model';
import { UserDocument } from '../user.model';
import mongoose from 'mongoose';

export interface FileInput {
    name: string;
    phaseId: PhaseDocument['_id'];
    teamId: TeamDocument['_id'];
}

export interface FileDocument extends FileInput {
    refreshToken: string;
    userId: UserDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const fileSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        phaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase' },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    });

const FileModel = mongoose.model<FileDocument>('File', fileSchema);
export default FileModel;