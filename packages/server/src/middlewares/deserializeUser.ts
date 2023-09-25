import { NextFunction, Request, Response } from 'express';
import { fetch } from '~/lib/utils';
import { DiscordOAuthMeResponse } from '~/types/discord';

export default async function deserializeUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    //TODO: Reissue token if refresh token exists but not access_token

    const { access_token, refresh_token } = request.cookies;

    request.user = null;

    if (!access_token && !refresh_token) {
      next();
    }

    const { user } = await fetch<DiscordOAuthMeResponse>(
      `https://discord.com/api/oauth2/@me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    request.user = user;

    next();
  } catch (error) {
    next();
  }
}
