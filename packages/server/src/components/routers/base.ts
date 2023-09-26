import { Router } from 'express';

import authRouter from '~/components/routers/auth';
import gamesRouter from '~/components/routers/games';

const router = Router();

router.use('/auth/discord', authRouter);

router.use('/games', gamesRouter);

export default router;
