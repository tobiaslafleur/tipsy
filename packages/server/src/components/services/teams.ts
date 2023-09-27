import { InsertObject } from 'kysely';
import { DB } from 'kysely-codegen';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

import pg from '~/db/pg';

async function createTeam(values: InsertObject<DB, 'teams'>) {
  return await pg
    .insertInto('teams')
    .values(values)
    .returningAll()
    .executeTakeFirst();
}

async function getTeamsByGameId(gameId: string) {
  return await pg
    .selectFrom('teams')
    .select(eb => [
      'id',
      'game_id',
      'name',
      'created_at',
      'updated_at',
      jsonArrayFrom(
        eb
          .selectFrom('users')
          .leftJoin('user_in_team', 'user_in_team.user_id', 'users.id')
          .select([
            'users.id as id',
            'users.discord_id',
            'users.name as name',
            'users.avatar as avatar',
            'users.created_at as created_at',
            'users.updated_at as updated_at',
          ])
          .whereRef('user_in_team.team_id', '=', 'teams.id')
      ).as('users'),
    ])
    .where('game_id', '=', gameId)
    .execute();
}

async function joinTeam(values: InsertObject<DB, 'user_in_team'>) {
  return await pg
    .insertInto('user_in_team')
    .values(values)
    .returningAll()
    .executeTakeFirst();
}

export default {
  createTeam,
  getTeamsByGameId,
  joinTeam,
};

/**
 * 
 * .leftJoin('user_in_team', 'user_in_team.team_id', 'teams.id')
    .leftJoin('users', 'users.id', 'user_in_team.user_id')
 */
