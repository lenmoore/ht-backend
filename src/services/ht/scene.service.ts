import SceneModel, { SceneDocument } from '../../models/performances/scene.model';
import { FilterQuery } from 'mongoose';

async function getAllScenes(filter: FilterQuery<SceneDocument> = {}): Promise<SceneDocument[]> {
    return SceneModel.find(filter);
}

async function getAllScenesPopulated(filter: FilterQuery<SceneDocument> = {}): Promise<SceneDocument[]> {
    return SceneModel.find(filter).populate({ path: 'tasks', populate: 'team' });
}

async function createScene(data: SceneDocument | object): Promise<SceneDocument> {
    return await SceneModel.create(data);
}

async function getOneSceneById(id: string): Promise<SceneDocument | null> {
    return SceneModel.findById(id).populate({ path: 'tasks' });

}

async function updateOneSceneById(id: string, data: object): Promise<SceneDocument | null> {
    return SceneModel.findByIdAndUpdate(id, data,
        { new: true });
}

async function deleteOneSceneById(id: string): Promise<SceneDocument | null> {
    return SceneModel.findByIdAndDelete(id);
}

async function startScene(scene: SceneDocument): Promise<SceneDocument> {
    scene.isActive = true;
    return scene.save();
}

export default {
    createScene,
    deleteOneSceneById,
    getAllScenes,
    getOneSceneById,
    updateOneSceneById,
    getAllScenesPopulated,
    startScene,
};