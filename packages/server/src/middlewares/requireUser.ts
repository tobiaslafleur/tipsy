import { NextFunction, Request, Response } from 'express';

export default function requireUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.session) {
    return response.sendStatus(403);
  }

  next();
}
