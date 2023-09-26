import { Router } from 'express';

import gamesController from '~/components/controllers/games';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.post('/', requireUser, gamesController.createGame);

export default router;
