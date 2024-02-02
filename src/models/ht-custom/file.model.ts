import { SceneDocument } from '../performances/scene.model';
import { UserDocument } from '../user.model';
import mongoose from 'mongoose';

export interface FileInput {
    name: string;
    sceneId: SceneDocument['_id'];
}

export interface FileDocument extends FileInput {
    refreshToken: string;
    userId: UserDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const fileSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        sceneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase' },
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    });

const FileModel = mongoose.model<FileDocument>('File', fileSchema);
export default FileModel;