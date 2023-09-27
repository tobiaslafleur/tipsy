import { NextFunction, Request, Response } from 'express';

export default function requireAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.session?.user.role !== 'ADMIN') {
    return response.sendStatus(403);
  }

  next();
}
