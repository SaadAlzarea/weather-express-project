import { Router } from 'express';
import * as AuthController from '../controllers/user.controller';
import { authorized } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/auth/signup', AuthController.signUp);
router.post('/auth/signin', AuthController.signIn);
router.post('/auth/signout', AuthController.signOut);
// router.post('/refresh-token', AuthController.refreshToken);s

// Authorized routes
// router.delete('/delete-account', authorized, AuthController.deleteAccount);

export default router; 