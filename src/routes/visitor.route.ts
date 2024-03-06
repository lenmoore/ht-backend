import UserController from '../controllers/admin/user.controller';

import FileController, { uploadMiddleware } from '../controllers/file.controller';
import express, { Router } from 'express';

const router: Router = express.Router();
router.get('/tasks/:name', UserController.getUserTasksByName);

router.post('/:id/video', FileController.confirmVideo);

router.post('/upload-video', uploadMiddleware, FileController.uploadVideo);
export default router;