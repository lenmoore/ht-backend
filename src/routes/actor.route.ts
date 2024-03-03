import express, { Router } from 'express';
import ActorPerformanceController from '../controllers/actor-performance.controller';
import PerformanceController from '../controllers/admin/performance.controller';
import SceneController from '../controllers/admin/scene.controller';

const router: Router = express.Router();

router.get('/performances', PerformanceController.getAllPerformances);
router.get('/template-scenes', SceneController.getAllScenesPopulated);

router.put('/performances/:id', PerformanceController.updatePerformanceById);

router.get('/performances/:id', PerformanceController.getPerformanceById);

router.get('/performance-scenes/', ActorPerformanceController.getAllPerformanceScenesForActor);

router.post('/performance-scenes/', ActorPerformanceController.createPerformanceScene);

router.put('/performance-scenes/:id', ActorPerformanceController.updatePerformanceSceneById);
router.put('/performance-scenes/toggle-task/:id', ActorPerformanceController.toggleTask);

router.delete('/performance-scenes/:id', ActorPerformanceController.deletePerformanceSceneById);

export default router;
