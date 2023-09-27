import { InsertObject } from 'kysely';
import { DB } from 'kysely-codegen';

import pg from '~/db/pg';

async function createGame(values: InsertObject<DB, 'games'>) {
  return await pg
    .insertInto('games')
    .values(values)
    .returningAll()
    .executeTakeFirst();
}

async function getGames() {
  return await pg.selectFrom('games').selectAll().execute();
}

async function startGame(game_id: string) {
  return await pg.transaction().execute(async trx => {
    const teams = await trx
      .selectFrom('teams')
      .selectAll()
      .where('game_id', '=', game_id)
      .execute();

    const tasks = await trx
      .selectFrom('tasks')
      .selectAll()
      .where('game_id', '=', game_id)
      .execute();

    for (const team of teams) {
      const users = await trx
        .selectFrom('user_in_team')
        .selectAll()
        .where('team_id', '=', team.id)
        .execute();

      if (users.length < 1) {
        await trx.deleteFrom('teams').where('id', '=', team.id).execute();

        continue;
      }

      for (const task of tasks) {
        await trx
          .insertInto('game_task')
          .values({ task_id: task.id, team_id: team.id })
          .execute();
      }
    }

    await trx.updateTable('games').set({ started: true }).execute();
  });
}

async function updateGameTaskById(
  game_task_id: string,
  values: { image: string; selected_team: string }
) {
  return await pg
    .updateTable('game_task')
    .set({ ...values, completed: true })
    .where('id', '=', game_task_id)
    .execute();
}

export default {
  createGame,
  getGames,
  startGame,
  updateGameTaskById,
};
