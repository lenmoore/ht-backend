import express, { Router } from 'express';
import PerformanceController from '../../controllers/admin/performance.controller';

const router: Router = express.Router();

router.get('/', PerformanceController.getAllPerformances);

router.get('/:id', PerformanceController.getPerformanceById);

router.post('/', PerformanceController.createPerformance);

router.put('/:id', PerformanceController.updatePerformanceById);

router.delete('/:id', PerformanceController.deletePerformanceById);

export default router;