import { NextFunction, Request, Response } from 'express';

import pg from '~/db/pg';

export default async function deserializeUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { session } = request.cookies;

    request.session = null;

    if (!session) {
      return next();
    }

    const userSession = await pg
      .selectFrom('sessions')
      .selectAll()
      .where('id', '=', session)
      .executeTakeFirst();

    if (!userSession) {
      return next();
    }

    const user = await pg
      .selectFrom('users')
      .where('id', '=', userSession.user_id)
      .selectAll()
      .executeTakeFirst();

    if (!user) {
      return next();
    }

    request.session = {
      session: userSession.id,
      user,
    };

    next();
  } catch (error) {
    next();
  }
}
