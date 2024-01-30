import express, { Router } from 'express';
import TodoController from '../../controllers/example/todo.controller';
// api/todos/[route]
const router: Router = express.Router();

router.get('/all', TodoController.getAllTodos);
router.get('/:id', TodoController.getOneTodo);
router.post('/', TodoController.addTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);
export default router;
