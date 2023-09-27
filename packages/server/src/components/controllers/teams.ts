import { Request, Response } from 'express';

import teamsService from '~/components/services/teams';

async function createTeam(request: Request, response: Response) {
  try {
    const team = await teamsService.createTeam(request.body);

    if (!team) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(201).send(team);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function getTeamById(request: Request, response: Response) {
  try {
    const team = await teamsService.getTeamById(request.params.id || '');

    if (!team) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.status(200).send(team);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function updateTeamById(request: Request, response: Response) {
  try {
    const team = await teamsService.updateTeamById(
      request.params.id || '',
      request.body
    );

    if (!team) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.status(200).send(team);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function deleteTeamById(request: Request, response: Response) {
  try {
    const team = await teamsService.deleteTeamById(request.params.id || '');

    if (!team) {
      return response.status(404).send({ error: 'Resource not found' });
    }

    return response.sendStatus(204);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function joinTeam(request: Request, response: Response) {
  try {
    const team = await teamsService.joinTeam({
      team_id: request.params.id || '',
      user_id: request.session?.user.id || '',
    });

    if (!team) {
      return response.status(500).send({ error: 'Something went wrong' });
    }

    return response.status(200).send(team);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function leaveTeam(request: Request, response: Response) {
  try {
    const team = await teamsService.leaveTeam(
      request.params.id || '',
      request.session?.user.id || ''
    );

    if (!team) {
      return response.status(404).send({ error: 'Something went wrong' });
    }

    return response.sendStatus(204);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

export default {
  createTeam,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  joinTeam,
  leaveTeam,
};
