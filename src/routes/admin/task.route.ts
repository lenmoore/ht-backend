import express, { Router } from 'express';
import TaskController from '../../controllers/admin/task.controller';

const router: Router = express.Router();


router.get('/', TaskController.getAllTasks);

router.get('/:id', TaskController.getTaskById);

router.post('/', TaskController.createTask);

router.put('/:id', TaskController.updateTaskById);

router.delete('/:id', TaskController.deleteTaskById);

export default router;
