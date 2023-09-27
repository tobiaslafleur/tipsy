import { InsertObject } from 'kysely';
import { DB } from 'kysely-codegen';
import pg from '~/db/pg';

async function createTask(values: InsertObject<DB, 'tasks'>) {
  return await pg
    .insertInto('tasks')
    .values(values)
    .returningAll()
    .executeTakeFirst();
}

async function getTasksByGameId(game_id: string) {
  return await pg
    .selectFrom('tasks')
    .selectAll()
    .where('game_id', '=', game_id)
    .execute();
}

async function getTasksByUserId(game_id: string, user_id: string) {
  return await pg
    .selectFrom('game_task')
    .leftJoin('tasks', 'tasks.id', 'game_task.task_id')
    .leftJoin('user_in_team', 'user_in_team.team_id', 'game_task.team_id')
    .where('user_in_team.user_id', '=', user_id)
    .where('tasks.game_id', '=', game_id)
    .select([
      'game_task.id as id',
      'game_task.completed as completed',
      'game_task.completed_at as completed_at',
      'tasks.title as title',
      'tasks.weight as weight',
      'tasks.description as description',
      'tasks.type as type',
    ])
    .execute();
}

async function getFeedByGameId(game_id: string) {
  return await pg
    .selectFrom('game_task')
    .leftJoin('tasks', 'tasks.id', 'game_task.task_id')
    .where('completed', '=', true)
    .where('tasks.game_id', '=', game_id)
    .selectAll()
    .orderBy('completed_at desc')
    .limit(10)
    .execute();
}

export default {
  createTask,
  getTasksByGameId,
  getTasksByUserId,
  getFeedByGameId,
};
