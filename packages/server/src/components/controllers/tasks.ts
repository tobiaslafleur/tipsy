import { Request, Response } from 'express';

import tasksService from '~/components/services/tasks';

async function createTask(request: Request, response: Response) {
  try {
    const task = await tasksService.createTask(request.body);

    if (!task) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(201).send(task);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

export default {
  createTask,
};
