import { Request, Response, response } from 'express';

async function createGame(request: Request, response: Response) {
  try {
  } catch (error) {
    return response.status(500).send({ error });
  }
}

export default {
  createGame,
};
