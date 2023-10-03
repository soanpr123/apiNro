import { Router } from 'express';
import { auth } from '@middlewares/auth';
import { hasRole } from '@middlewares/checkRoles';
import UserRouter from './User';
import AuthRouter from './Auth';

import SessionRouter from './Session';


const router = Router();

router.use('/auth', AuthRouter);
router.use('/session', auth, SessionRouter);
router.use('/user', auth, hasRole('admin'), UserRouter);
router.use('/user', UserRouter);

export default router;
