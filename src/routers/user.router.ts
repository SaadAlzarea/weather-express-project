import { Router } from 'express';
import * as AuthController from '../controllers/user.controller';
import { authorized } from '../middleware/auth.middleware';

const router = Router();

//  router
router.post('/auth/signup', AuthController.signUp);
router.post('/auth/signin', AuthController.signIn);
router.post('/auth/signout', AuthController.signOut);


export default router; 