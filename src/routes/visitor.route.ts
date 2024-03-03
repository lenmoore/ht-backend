import UserController from '../controllers/admin/user.controller';
import router from './admin/user.route';
import FileController from '../controllers/file.controller';

router.get('/tasks/:name', UserController.getUserTasksByName);

router.post('/:id/video', FileController.confirmVideo);

export default router;