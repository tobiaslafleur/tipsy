import { Router } from 'express';

import authRouter from '~/components/routers/auth';
import gamesRouter from '~/components/routers/games';
import teamsRouter from '~/components/routers/teams';
import tasksRouter from '~/components/routers/tasks';

const router = Router();

router.use('/auth/discord', authRouter);

router.use('/games', gamesRouter);

router.use('/teams', teamsRouter);

router.use('/tasks', tasksRouter);

export default router;
