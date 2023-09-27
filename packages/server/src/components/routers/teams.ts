import { Router } from 'express';

import teamsController from '~/components/controllers/teams';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.post('/', requireUser, teamsController.createTeam);

router.post('/:id/join', requireUser, teamsController.joinTeam);

export default router;
