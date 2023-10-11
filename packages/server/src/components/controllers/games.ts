import { Request, Response } from 'express';

import gamesService from '~/components/services/games';
import teamsService from '~/components/services/teams';
import tasksService from '~/components/services/tasks';
import sendDiscordNotification from '~/lib/discord';

async function createGame(request: Request, response: Response) {
  try {
    const game = await gamesService.createGame(request.body);

    if (!game) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(201).send(game);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function getGameById(request: Request, response: Response) {
  try {
    const game = await gamesService.getGameById(request.params.id || '');

    if (!game) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.status(200).send(game);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function updateGameById(request: Request, response: Response) {
  try {
    const game = await gamesService.updateGameById(
      request.params.id || '',
      request.body
    );

    if (!game) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.status(200).send(game);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function deleteGameById(request: Request, response: Response) {
  try {
    const game = await gamesService.deleteGameById(request.params.id || '');

    if (!game) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.status(204);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function getGames(request: Request, response: Response) {
  try {
    const games = await gamesService.getGames();

    console.log('getting games');

    if (!games) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(200).send(games);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function getMyGames(request: Request, response: Response) {
  try {
    const games = await gamesService.getMyGames(request.session?.user.id || '');

    if (!games) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(200).send(games);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function getTeamsByGameId(request: Request, response: Response) {
  try {
    const games = await teamsService.getTeamsByGameId(request.params.id || '');

    if (!games) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(200).send(games);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

async function getTasksByGameId(request: Request, response: Response) {
  try {
    const tasks = await tasksService.getTasksByGameId(request.params.id || '');

    if (!tasks) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

async function getTasksByUserId(request: Request, response: Response) {
  try {
    const tasks = await tasksService.getTasksByUserId(
      request.params.id || '',
      request.params.user_id || ''
    );

    if (!tasks) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

async function updateGameTaskById(request: Request, response: Response) {
  try {
    await gamesService.updateGameTaskById(request.params.task_id || '', {
      selected_team: request.body.selected_team,
      image: request.file?.filename || '',
    });

    sendDiscordNotification(request.params.task_id || '');

    return response.sendStatus(200);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

async function getFeed(request: Request, response: Response) {
  try {
    const feed = await tasksService.getFeedByGameId(request.params.id || '');

    return response.status(200).send(feed);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function startGame(request: Request, response: Response) {
  try {
    await gamesService.startGame(request.params.id || '');

    return response.sendStatus(200);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

async function stopGame(request: Request, response: Response) {
  try {
    await gamesService.stopGame(request.params.id || '');

    return response.sendStatus(200);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

export default {
  createGame,
  getGameById,
  updateGameById,
  deleteGameById,
  getGames,
  getMyGames,
  getTeamsByGameId,
  getTasksByGameId,
  getTasksByUserId,
  updateGameTaskById,
  getFeed,
  startGame,
  stopGame,
};
