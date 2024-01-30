import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
// api/auth/[route]

const router: Router = express.Router();

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

router.delete('/logout', AuthController.logout);

router.get('/refresh-token', AuthController.refreshToken);

export default router;
