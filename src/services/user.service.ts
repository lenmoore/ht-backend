import mongoose, { FilterQuery, ProjectionType, UpdateQuery } from 'mongoose';
import UserModel, { UserDocument } from '../mongo/models/user.model';

async function getAllUsers(filter: FilterQuery<UserDocument> = {}): Promise<UserDocument[]> {
    return UserModel.find(filter, { password: 0, __v: 0 });
}

async function getOneUserById(id: string | mongoose.Types.ObjectId, selectedField: ProjectionType<UserDocument> = {}): Promise<UserDocument | null> {
    return await getOneUser({ _id: id }, selectedField);
}

async function getOneUser(
    filter: FilterQuery<UserDocument> = {},
    selectedField: ProjectionType<UserDocument> = {},
    hidePassword: boolean = true,
): Promise<UserDocument | null> {
    const hidePasswordAndVersion = { password: 0, __v: 0 };
    return UserModel.findOne(filter, {
        ...(hidePassword ? hidePasswordAndVersion : {}),
        ...(typeof selectedField === 'object' ? selectedField : {}),
    });
}

async function createUser(data: UserDocument | object): Promise<UserDocument> {
    return await UserModel.create(data);
}

async function updateOneUserById(id: string | mongoose.Types.ObjectId, data: UpdateQuery<UserDocument>): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
}

async function updateOneUser(filter: FilterQuery<UserDocument>, data: UpdateQuery<UserDocument>): Promise<any> {
    // @ts-ignore
    return UserModel.updateOne(filter, data, { new: true });
}

async function deleteOneUser(filter: FilterQuery<UserDocument>): Promise<any> {
    return UserModel.deleteOne(filter);
}

async function deleteOneUserById(id: string | mongoose.Types.ObjectId): Promise<UserDocument | null> {
    return UserModel.findByIdAndDelete(id);
}

export default {
    createUser,
    deleteOneUserById,
    getAllUsers,
    getOneUser,
    getOneUserById,
    updateOneUserById,
    deleteOneUser,
    updateOneUser,
};
