import mongoose, { FilterQuery, ProjectionType, UpdateQuery } from 'mongoose';
import UserService from './user.service';
import SessionModel, { SessionDocument } from '../models/session.model';

async function getAllSessions(filter: FilterQuery<SessionDocument> = {}): Promise<SessionDocument[]> {
    return await SessionModel.find(filter);
}

async function getOneSessionById(
    id: string | mongoose.Types.ObjectId,
    selectedField: ProjectionType<SessionDocument> = {},
): Promise<SessionDocument | null> {
    return await getOneSession({ _id: id }, selectedField);
}


async function getOneSession(filter: FilterQuery<SessionDocument> = {}, selectedField: ProjectionType<SessionDocument> = {}): Promise<SessionDocument | null> {
    return await SessionModel.findOne(filter, selectedField);
}

async function createSession(data: SessionDocument | object): Promise<SessionDocument> {
    return await SessionModel.create(data);
}

async function updateOneSessionById(id: string | mongoose.Types.ObjectId, data: UpdateQuery<SessionDocument>): Promise<SessionDocument | null> {
    return SessionModel.findByIdAndUpdate(id, data, { new: true });
}

async function updateOneSession(filter: FilterQuery<SessionDocument>, data: UpdateQuery<SessionDocument>): Promise<any> {
    // @ts-ignore
    return SessionModel.updateOne(filter, data, { new: true });
}

async function deleteOneSession(filter: FilterQuery<SessionDocument>): Promise<any> {
    return await SessionModel.deleteOne(filter);
}

async function deleteOneSessionById(id: string | mongoose.Types.ObjectId): Promise<SessionDocument | null> {
    return SessionModel.findByIdAndDelete(id);
}

async function revokeSession(sessionId: string | mongoose.Types.ObjectId): Promise<void> {
    const session = await getOneSessionById(sessionId);

    if (!session) throw new Error('Session not found');

    const user = await UserService.getOneUserById(session.userId as mongoose.Types.ObjectId);

    if (!user) throw new Error('User not found');

    const updateQueryUser = { $pull: { sessions: session._id } };
    await UserService.updateOneUserById(user._id, updateQueryUser);
    await deleteOneSessionById(session._id);

    return;
}

export default {
    createSession,
    deleteOneSession,
    deleteOneSessionById,
    getAllSessions,
    getOneSession,
    getOneSessionById,
    revokeSession,
    updateOneSession,
    updateOneSessionById,
};
