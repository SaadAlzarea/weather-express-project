import * as AuthController from '../controllers/user.controller';
import { Router } from 'express';


const router = Router();

router.post('/signup', AuthController.signUp )
router.post('/signin', AuthController.signIn )
router.post('/signout',AuthController.signOut )


export default router