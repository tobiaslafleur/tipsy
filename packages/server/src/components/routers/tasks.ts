import { Router } from 'express';

import tasksController from '~/components/controllers/tasks';
import requireAdmin from '~/middlewares/requireAdmin';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.post('/', requireAdmin, tasksController.createTask);

router.get('/:id', requireUser, tasksController.getTaskById);

router.put('/:id', requireAdmin, tasksController.updateTaskById);

router.delete('/:id', requireAdmin, tasksController.deleteTaskById);

export default router;
