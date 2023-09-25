import { Request, Response } from 'express';
import { fetch } from '~/lib/utils';
import { DiscordOAuthTokenResponse } from '~/types/discord';

async function signIn(request: Request, response: Response) {
  try {
    const signInUri = String(process.env.DISCORD_SIGNIN_URI);

    console.log('in here');

    return response.redirect(signInUri);
  } catch (error) {
    return response.status(500).send({ error: 'Something went wrong' });
  }
}

async function callback(request: Request, response: Response) {
  try {
    const code = String(request.query.code);

    // TODO: return if no code exists

    const body = new URLSearchParams({
      client_id: String(process.env.DISCORD_CLIENT_ID),
      client_secret: String(process.env.DISCORD_CLIENT_SECRET),
      grant_type: 'authorization_code',
      code,
      redirect_uri: String(process.env.DISCORD_CALLBACK_URI),
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/x-www-form-urlencoded',
    };

    const { access_token, refresh_token, expires_in } =
      await fetch<DiscordOAuthTokenResponse>(
        `https://discord.com/api/oauth2/token`,
        {
          method: 'POST',
          headers,
          body,
        }
      );

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * expires_in,
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    const redirectUri = String(process.env.CLIENT_REDIRECT_URI);

    return response.redirect(redirectUri);
  } catch (error) {
    return response.status(500).send({ error: 'Something went wrong' });
  }
}

async function me(request: Request, response: Response) {
  try {
    const signInUri = String(process.env.DISCORD_SIGNIN_URI);

    console.log(request.user);

    return response.status(200).send(request.user);
  } catch (error) {
    return response.status(500).send({ error: 'Something went wrong' });
  }
}

export default {
  signIn,
  callback,
  me,
};
