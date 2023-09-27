import { Router } from 'express';

import gamesController from '~/components/controllers/games';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.post('/', requireUser, gamesController.createGame);

router.get('/', gamesController.getGames);

router.get('/:id/teams', gamesController.getTeamsByGameId);

router.get('/:id/teams/:user_id/tasks', gamesController.getTasksByUserId);

router.get('/:id/tasks', gamesController.getTasksByGameId);

router.put('/:id/tasks/:task_id', gamesController.updateGameTaskById);

router.get('/:id/feed', gamesController.getFeed);

router.post('/:id/start', gamesController.startGame);

export default router;
