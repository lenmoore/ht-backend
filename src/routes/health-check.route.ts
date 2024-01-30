import express, { Router } from 'express';
import healthCheckController from '../controllers/health-check.controller';

const router: Router = express.Router();

router.get('/', healthCheckController.healthCheck);

export default router;
