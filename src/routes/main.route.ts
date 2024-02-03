import express, { Router } from 'express';
import MainController from '../controllers/main.controller';

const router: Router = express.Router();

router.get('/', MainController.index);

router.get('/teams', MainController.getAllTeamsInGroup);
export default router;
