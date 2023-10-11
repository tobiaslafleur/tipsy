import { randomUUID } from 'crypto';
import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import path from 'path';

import gamesController from '~/components/controllers/games';
import requireAdmin from '~/middlewares/requireAdmin';
import requireUser from '~/middlewares/requireUser';

const router = Router();

const storage = diskStorage({
  destination: path.join(process.cwd(), 'images'),
  filename: (req, file, cb) => {
    const fileName = `${randomUUID()}.${file.mimetype.split('/')[1]}`;

    cb(null, fileName);
  },
});

export const upload = multer({ storage });

router.post('/', requireAdmin, gamesController.createGame);

router.get('/', gamesController.getGames);

router.get('/me', gamesController.getMyGames);

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
  upload.single('file'),
  gamesController.updateGameTaskById
);

router.get('/:id/feed', gamesController.getFeed);

router.post('/:id/start', requireAdmin, gamesController.startGame);

router.post('/:id/stop', requireAdmin, gamesController.stopGame);

export default router;
