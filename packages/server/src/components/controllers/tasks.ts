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

async function getTaskById(request: Request, response: Response) {
  try {
    const task = await tasksService.getTaskById(request.params.id || '');

    if (!task) {
      return response.status(404).send({ error: 'Resource not found' });
    }
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function updateTaskById(request: Request, response: Response) {
  try {
    const task = await tasksService.updateTaskById(
      request.params.id || '',
      request.body
    );

    if (!task) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.status(200).send(task);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function deleteTaskById(request: Request, response: Response) {
  try {
    const task = await tasksService.deleteTaskById(request.params.id || '');

    if (!task) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.sendStatus(204);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

export default {
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
