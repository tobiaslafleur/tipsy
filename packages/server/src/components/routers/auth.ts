import { Router } from 'express';

import authController from '~/components/controllers/auth';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.get('/sign-in', authController.signIn);

router.get('/callback', authController.callback);

router.get('/me', requireUser, authController.me);

router.delete('/sign-out', authController.signOut);

export default router;
