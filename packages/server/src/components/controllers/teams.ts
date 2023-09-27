import { Request, Response } from 'express';

import teamsService from '~/components/services/teams';

async function createTeam(request: Request, response: Response) {
  try {
    const game = await teamsService.createTeam(request.body);

    if (!game) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(201).send(game);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

async function joinTeam(request: Request, response: Response) {
  try {
    const team = await teamsService.joinTeam({
      ...request.body,
      team_id: request.params.id,
    });

    if (!team) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(201).send(team);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error });
  }
}

export default {
  createTeam,
  joinTeam,
};
