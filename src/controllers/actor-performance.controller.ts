// createPerformanceScene,
//     deleteOnePerformanceSceneById,
//     getAllPerformanceScenes,
//     updateOnePerformanceSceneById,


import { Request, Response } from 'express';
import PerformanceService from '../services/ht/performance.service';
import { resFailed, resSuccess } from '../extras/helpers';
import { PerformanceSceneDocument } from '../models/performances/performance-scene.model';
import { TaskDocument } from '../models/ht-custom/task.model';
import TaskService from '../services/ht/task.service';

async function getAllPerformanceScenesForActor(req: Request, res: Response): Promise<Response> {
    try {
        console.log(req.params);
        const performanceScenes: PerformanceSceneDocument[] = await PerformanceService.getAllPerformanceScenes({
            performanceId: req.params.performanceId,
            actorUserId: req.params.actorUserId,
        });

        if (!performanceScenes) {
            const message: string = 'performances not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get all performances';
        return resSuccess(res, 200, message, performanceScenes);
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function getAllPerformanceScenes(req: Request, res: Response): Promise<Response> {
    try {
        const performanceScenes: PerformanceSceneDocument[] = await PerformanceService.getAllPerformanceScenes({
            performanceId: req.body.performanceId,
        });

        if (!performanceScenes) {
            const message: string = 'performances not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get all performances';
        return resSuccess(res, 200, message, performanceScenes);
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function createPerformanceScene(req: Request, res: Response): Promise<Response> {
    try {
        const data = req.body;
        const performanceScene: PerformanceSceneDocument = await PerformanceService.createPerformanceScene({
            ...data,
            isActive: true,
        });

        const message: string = 'Success create new performance';
        return resSuccess(res, 201, message, { performanceScene });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function updatePerformanceSceneById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const data = req.body;
        const performanceScene: PerformanceSceneDocument | null = await PerformanceService.updateOnePerformanceSceneById(id, data);

        if (!performanceScene) {
            const message: string = 'performance not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success update performance';
        return resSuccess(res, 200, message, { performanceScene });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function toggleTask(req: Request, res: Response): Promise<Response> {
    // _id: task.taskId,
    //     isActive: task.isActive,
    try {

        const task: TaskDocument | null = await TaskService.updateOneTaskById(req.body._id, { isActive: req.body.isActive });
        if (task) {
            return resSuccess(res, 200, 'Success update task', { task });
        }
    } catch (error: any) {
        return resFailed(res, 500, error.message);

    }
}

async function deletePerformanceSceneById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const performanceScene: PerformanceSceneDocument | null = await PerformanceService.deleteOnePerformanceSceneById(id);

        if (!performanceScene) {
            const message: string = 'performance not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success delete performance';
        return resSuccess(res, 200, message, { performanceScene });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

export default {
    getAllPerformanceScenesForActor,
    getAllPerformanceScenes,
    createPerformanceScene,
    updatePerformanceSceneById,
    deletePerformanceSceneById,
    toggleTask,
};