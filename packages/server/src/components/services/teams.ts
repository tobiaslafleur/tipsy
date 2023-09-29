import { InsertObject, UpdateObject } from 'kysely';
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

async function getTeamById(team_id: string) {
  return await pg
    .selectFrom('teams')
    .where('id', '=', team_id)
    .selectAll()
    .executeTakeFirst();
}

async function updateTeamById(
  team_id: string,
  values: UpdateObject<DB, 'teams'>
) {
  return await pg
    .updateTable('teams')
    .where('id', '=', team_id)
    .set(values)
    .returningAll()
    .executeTakeFirst();
}

async function deleteTeamById(team_id: string) {
  return await pg
    .deleteFrom('teams')
    .where('id', '=', team_id)
    .returningAll()
    .executeTakeFirst();
}

async function getTeamsByGameId(game_id: string) {
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
    .where('game_id', '=', game_id)
    .execute();
}

async function joinTeam(values: InsertObject<DB, 'user_in_team'>) {
  const { game_id } = await pg
    .selectFrom('teams')
    .where('id', '=', values.team_id as string)
    .select('game_id')
    .executeTakeFirstOrThrow();

  const res = await pg
    .selectFrom('user_in_team')
    .leftJoin('teams', 'teams.id', 'user_in_team.team_id')
    .leftJoin('games', 'games.id', 'teams.game_id')
    .where('user_in_team.user_id', '=', values.user_id)
    .where('games.id', '=', game_id)
    .select(({ fn }) => [fn.count<number>('user_in_team.user_id').as('count')])
    .groupBy('user_in_team.user_id')
    .executeTakeFirst();

  if (res && res.count > 0) {
    throw new Error('Already in team');
  }

  return await pg
    .insertInto('user_in_team')
    .values(values)
    .returningAll()
    .executeTakeFirst();
}

async function leaveTeam(team_id: string, user_id: string) {
  return await pg
    .deleteFrom('user_in_team')
    .where('team_id', '=', team_id)
    .where('user_id', '=', user_id)
    .returningAll()
    .executeTakeFirst();
}

export default {
  createTeam,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  getTeamsByGameId,
  joinTeam,
  leaveTeam,
};
