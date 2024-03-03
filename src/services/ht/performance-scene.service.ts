import PerformanceSceneModel, { PerformanceSceneDocument } from '../../models/performances/performance-scene.model';
import { FilterQuery } from 'mongoose';

async function getAllPerformanceScenes(filter: FilterQuery<PerformanceSceneDocument> = {}): Promise<PerformanceSceneDocument[]> {
    return PerformanceSceneModel.find(filter);
}

async function getOnePerformanceSceneById(id: string): Promise<PerformanceSceneDocument | null> {
    return PerformanceSceneModel.findById(id);
}

async function createPerformanceScene(data: PerformanceSceneDocument | object): Promise<PerformanceSceneDocument> {
    return await PerformanceSceneModel.create(data);
}

async function updateOnePerformanceSceneById(id: string, data: object): Promise<PerformanceSceneDocument | null> {
    return PerformanceSceneModel.findByIdAndUpdate(id, data, {
        new: true,
    });
}

async function deleteOnePerformanceSceneById(id: string): Promise<PerformanceSceneDocument | null> {
    return PerformanceSceneModel.findByIdAndDelete(id);
}

export default {
    createPerformanceScene,
    deleteOnePerformanceSceneById,
    getAllPerformanceScenes,
    getOnePerformanceSceneById,
    updateOnePerformanceSceneById,
};