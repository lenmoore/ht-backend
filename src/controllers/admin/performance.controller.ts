import { resFailed, resSuccess } from '../../extras/helpers';
import PerformanceService from '../../services/ht/performance.service';
import { PerformanceDocument } from '../../models/performances/performance.model';
import { Request, Response } from 'express';

async function getAllPerformances(_: Request, res: Response): Promise<Response> {
    try {
        const performances: PerformanceDocument[] = await PerformanceService.getAllPerformances();

        if (!performances) {
            const message: string = 'performances not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get all performances';
        return resSuccess(res, 200, message, { performances });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function getPerformanceById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const performance: PerformanceDocument | null = await PerformanceService.getOnePerformanceById(id);

        if (!performance) {
            const message: string = 'performance not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success get performance by id';
        return resSuccess(res, 200, message, { performance });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function createPerformance(req: Request, res: Response): Promise<Response> {
    try {
        const data = req.body;
        const performance: PerformanceDocument = await PerformanceService.createPerformance(data);

        const message: string = 'Success create new performance';
        return resSuccess(res, 201, message, { performance });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function updatePerformanceById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log(data);
        const performance: PerformanceDocument | null = await PerformanceService.updateOnePerformanceById(id, data);

        console.log(performance);
        if (!performance) {
            const message: string = 'performance not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success update performance by id';
        return resSuccess(res, 200, message, { performance });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

async function deletePerformanceById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const performance: PerformanceDocument | null = await PerformanceService.deleteOnePerformanceById(id);

        if (!performance) {
            const message: string = 'performance not found';
            return resFailed(res, 404, message);
        }

        const message: string = 'Success delete performance by id';
        return resSuccess(res, 200, message, { performance });
    } catch (error: any) {
        return resFailed(res, 500, error.message);
    }
}

export default {
    createPerformance,
    deletePerformanceById,
    getAllPerformances,
    getPerformanceById,
    updatePerformanceById,
};