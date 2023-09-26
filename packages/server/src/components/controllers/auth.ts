import { Request, Response } from 'express';
import pg from '~/db/pg';
import { fetch } from '~/lib/utils';
import {
  DiscordOAuthMeResponse,
  DiscordOAuthTokenResponse,
} from '~/types/discord';

async function signIn(request: Request, response: Response) {
  try {
    const signInUri = String(process.env.DISCORD_SIGNIN_URI);

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

    const { access_token } = await fetch<DiscordOAuthTokenResponse>(
      `https://discord.com/api/oauth2/token`,
      {
        method: 'POST',
        headers,
        body,
      }
    );

    const { user } = await fetch<DiscordOAuthMeResponse>(
      `https://discord.com/api/oauth2/@me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const newUser = await pg
      .insertInto('users')
      .values({
        discord_id: user.id,
        avatar: user.avatar,
        name: user.global_name,
      })
      .onConflict(oc =>
        oc
          .column('discord_id')
          .doUpdateSet({ avatar: user.avatar, name: user.global_name })
      )
      .returningAll()
      .executeTakeFirstOrThrow();

    const session = await pg
      .insertInto('sessions')
      .values({ user_id: newUser.id })
      .returning('id')
      .executeTakeFirstOrThrow();

    response.cookie('session', session.id, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    const redirectUri = String(process.env.CLIENT_REDIRECT_URI);

    return response.redirect(redirectUri);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error: 'Something went wrong' });
  }
}

async function me(request: Request, response: Response) {
  try {
    const user = await pg
      .selectFrom('users')
      .selectAll()
      .where('id', '=', request.session?.user || '')
      .executeTakeFirst();

    return response.status(200).send({ ...user });
  } catch (error) {
    return response.status(500).send({ error: 'Something went wrong' });
  }
}

async function signOut(request: Request, response: Response) {
  try {
    await pg
      .deleteFrom('sessions')
      .where('id', '=', request.session?.session || '')
      .executeTakeFirst();

    response.clearCookie('session');

    return response.sendStatus(204);
  } catch (error) {
    return response.status(500).send({ error: 'Something went wrong' });
  }
}

export default {
  signIn,
  callback,
  me,
  signOut,
};
