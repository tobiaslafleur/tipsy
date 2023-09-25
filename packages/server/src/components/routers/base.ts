import { Router } from 'express';

import authRouter from '~/components/routers/auth';

const router = Router();

router.use('/auth/discord', authRouter);

export default router;
