import express, { Router } from 'express';
import SceneController from '../../controllers/admin/scene.controller';

const router: Router = express.Router();


router.get('/', SceneController.getAllScenes);

router.get('/:id', SceneController.getSceneById);

router.post('/', SceneController.createScene);

router.put('/:id', SceneController.updateSceneById);

router.delete('/:id', SceneController.deleteSceneById);

export default router;
