import { Router } from 'express';

import tasksController from '~/components/controllers/tasks';
import requireUser from '~/middlewares/requireUser';

const router = Router();

router.post('/', requireUser, tasksController.createTask);

export default router;
