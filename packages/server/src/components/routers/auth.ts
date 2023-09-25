import { Router } from 'express';

import authController from '~/components/controllers/auth';

const router = Router();

router.get('/sign-in', authController.signIn);

router.get('/callback', authController.callback);

router.get('/me', authController.me);

export default router;
