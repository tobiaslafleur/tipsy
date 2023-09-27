import { InsertObject, InsertResult, UpdateObject } from 'kysely';
import { DB } from 'kysely-codegen';

import pg from '~/db/pg';

async function createGame(values: InsertObject<DB, 'games'>) {
  return await pg
    .insertInto('games')
    .values(values)
    .returningAll()
    .executeTakeFirst();
}

async function getGameById(game_id: string) {
  return await pg
    .selectFrom('games')
    .where('id', '=', game_id)
    .selectAll()
    .executeTakeFirst();
}

async function updateGameById(
  game_id: string,
  values: UpdateObject<DB, 'games'>
) {
  return await pg
    .updateTable('games')
    .where('id', '=', game_id)
    .set(values)
    .returningAll()
    .executeTakeFirst();
}

async function deleteGameById(game_id: string) {
  return await pg
    .deleteFrom('games')
    .where('id', '=', game_id)
    .returningAll()
    .execute();
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

      const promises: Promise<InsertResult[]>[] = [];

      for (const task of tasks) {
        const promise = trx
          .insertInto('game_task')
          .values({ task_id: task.id, team_id: team.id })
          .execute();

        promises.push(promise);
      }

      await Promise.all(promises);
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
  getGameById,
  updateGameById,
  deleteGameById,
  getGames,
  startGame,
  updateGameTaskById,
};
