import PerformanceModel, { PerformanceDocument } from '../../models/performances/performance.model';
import { FilterQuery } from 'mongoose';
import PerformanceSceneModel, { PerformanceSceneDocument } from '../../models/performances/performance-scene.model';

async function getAllPerformances(filter: FilterQuery<PerformanceDocument> = {}): Promise<PerformanceDocument[]> {
    return PerformanceModel.find(filter);
}

async function getOnePerformanceById(id: string): Promise<PerformanceDocument | null> {
    return PerformanceModel.findById(id);

}

async function createPerformance(data: PerformanceDocument | object): Promise<PerformanceDocument> {
    return await PerformanceModel.create(data);
}

async function updateOnePerformanceById(id: string, data: object): Promise<PerformanceDocument | null> {
    return PerformanceModel.findByIdAndUpdate(id, data, {
        new: true,
    });
}

async function deleteOnePerformanceById(id: string): Promise<PerformanceDocument | null> {
    return PerformanceModel.findByIdAndDelete(id);
}

async function getAllPerformanceScenes(payload: FilterQuery<PerformanceSceneDocument>): Promise<PerformanceSceneDocument[] | null> {
    return PerformanceSceneModel.find(payload);
}

async function createPerformanceScene(data: PerformanceSceneDocument | object): Promise<PerformanceSceneDocument> {
    return await PerformanceSceneModel.create(data);
}

async function getOnePerformanceSceneById(id: string, data: object): Promise<PerformanceSceneDocument | null> {
    return PerformanceSceneModel.findById(id);
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
    createPerformance,
    deleteOnePerformanceById,
    getAllPerformances,
    getOnePerformanceById,
    updateOnePerformanceById,
    createPerformanceScene,
    deleteOnePerformanceSceneById,
    getAllPerformanceScenes,
    updateOnePerformanceSceneById,
};
