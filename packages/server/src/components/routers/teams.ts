import { Router } from 'express';

import teamsController from '~/components/controllers/teams';
import requireAdmin from '~/middlewares/requireAdmin';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.post('/', requireUser, teamsController.createTeam);

router.get('/:id', teamsController.getTeamById);

router.put('/:id', requireAdmin, teamsController.updateTeamById);

router.delete('/:id', requireAdmin, teamsController.deleteTeamById);

router.post('/:id/join', requireUser, teamsController.joinTeam);

router.delete('/:id/leave', requireUser, teamsController.leaveTeam);

export default router;
