import { InsertObject } from 'kysely';
import { DB } from 'kysely-codegen';
import pg from '~/db/pg';
import { fetch } from '~/lib/utils';
import {
  DiscordOAuthMeResponse,
  DiscordOAuthTokenResponse,
} from '~/types/discord';

async function createUser(values: InsertObject<DB, 'users'>) {
  return await pg
    .insertInto('users')
    .values(values)
    .onConflict(oc =>
      oc
        .column('discord_id')
        .doUpdateSet({ avatar: values.avatar, name: values.name })
    )
    .returningAll()
    .executeTakeFirst();
}

async function createSession(values: InsertObject<DB, 'sessions'>) {
  return await pg
    .insertInto('sessions')
    .values(values)
    .returning('id')
    .executeTakeFirst();
}

async function deleteSession(session: string) {
  return await pg.deleteFrom('sessions').where('id', '=', session).execute();
}

async function getUserById(user_id: string) {
  return await pg
    .selectFrom('users')
    .selectAll()
    .where('id', '=', user_id)
    .executeTakeFirst();
}

async function getDiscordUserByCode(code: string) {
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

  const data = await fetch<DiscordOAuthMeResponse>(
    `https://discord.com/api/oauth2/@me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return data;
}

export default {
  createUser,
  createSession,
  deleteSession,
  getUserById,
  getDiscordUserByCode,
};
