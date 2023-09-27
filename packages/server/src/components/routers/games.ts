import { Router } from 'express';

import gamesController from '~/components/controllers/games';
import requireAdmin from '~/middlewares/requireAdmin';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.post('/', requireAdmin, gamesController.createGame);

router.get('/', gamesController.getGames);

router.get('/:id', gamesController.getGameById);

router.put('/:id', requireAdmin, gamesController.updateGameById);

router.delete('/:id', requireAdmin, gamesController.deleteGameById);

router.get('/:id/teams', gamesController.getTeamsByGameId);

//TODO: Move to gameTask file?
router.get(
  '/:id/teams/:user_id/tasks',
  requireUser,
  gamesController.getTasksByUserId
);

router.get('/:id/tasks', gamesController.getTasksByGameId);

//TODO: Move to gameTask file?
router.put(
  '/:id/tasks/:task_id',
  requireUser,
  gamesController.updateGameTaskById
);

router.get('/:id/feed', gamesController.getFeed);

router.post('/:id/start', requireAdmin, gamesController.startGame);

export default router;
