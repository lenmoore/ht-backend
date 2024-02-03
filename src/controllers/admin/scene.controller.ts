import { Request, Response } from 'express';
import { resFailed, resSuccess } from '../../extras/helpers';
import { SceneDocument } from '../../models/performances/scene.model';
import SceneService from '../../services/ht/scene.service';

async function getAllScenes(_: Request, res: Response): Promise<Response> {
    try {
        const scenes: SceneDocument[] = await SceneService.getAllScenes();

        if (!scenes.length) {
            const message: string = 'scenes empty';
            return resFailed(res, 200, message);
        }

        const message: string = 'Success get all scenes';
        return resSuccess(res, 200, message, { scenes });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function getAllScenesPopulated(_: Request, res: Response): Promise<Response> {
    try {
        const scenes: SceneDocument[] = await SceneService.getAllScenesPopulated();

        if (!scenes.length) {
            const message: string = 'scenes empty';
            return resFailed(res, 200, message);
        }

        const message: string = 'Success get all scenes';
        return resSuccess(res, 200, message, { scenes });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function getSceneById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const scene: SceneDocument | null = await SceneService.getOneSceneById(id);

        if (!scene) {
            const message: string = 'scene not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get scene by id';
        return resSuccess(res, 200, message, { scene });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function createScene(req: Request, res: Response): Promise<Response> {
    try {
        const { title, description, orderNumber, teams, tasks, groupName } = req.body;
        const data = { title, description, orderNumber, teams, tasks, groupName };
        const scene: SceneDocument = await SceneService.createScene(data);

        const message: string = 'Success create new scene';
        return resSuccess(res, 201, message, { scene });
    } catch (error: any) {
        console.log(error);
        return resFailed(res, 500, error.message);
    }
}

async function updateSceneById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const data = req.body;
        const scene: SceneDocument | null = await SceneService.updateOneSceneById(id, data);

        if (!scene) {
            const message: string = 'scene not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success update scene by id';
        return resSuccess(res, 200, message, { scene });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function deleteSceneById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const scene: SceneDocument | null = await SceneService.deleteOneSceneById(id);

        if (!scene) {
            const message: string = 'scene not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success delete scene by id';
        return resSuccess(res, 200, message, { scene });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

export default {
    getAllScenes,
    getSceneById,
    createScene,
    updateSceneById,
    deleteSceneById,
    getAllScenesPopulated,
};