import { InsertObject, UpdateObject } from 'kysely';
import { DB } from 'kysely-codegen';

import pg from '~/db/pg';

async function createTask(values: InsertObject<DB, 'tasks'>) {
  return await pg
    .insertInto('tasks')
    .values(values)
    .returningAll()
    .executeTakeFirst();
}

async function getTaskById(task_id: string) {
  return await pg
    .selectFrom('tasks')
    .where('id', '=', task_id)
    .selectAll()
    .executeTakeFirst();
}

async function updateTaskById(
  task_id: string,
  values: UpdateObject<DB, 'tasks'>
) {
  return await pg
    .updateTable('tasks')
    .where('id', '=', task_id)
    .set(values)
    .returningAll()
    .executeTakeFirst();
}

async function deleteTaskById(task_id: string) {
  return await pg
    .deleteFrom('tasks')
    .where('id', '=', task_id)
    .returningAll()
    .execute();
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
    .leftJoin('teams as t', 't.id', 'game_task.team_id')
    .leftJoin('teams as st', 'st.id', 'game_task.selected_team')
    .where('completed', '=', true)
    .where('tasks.game_id', '=', game_id)
    .select([
      'game_task.id as id',
      'game_task.completed as completed',
      'game_task.completed_at as completed_at',
      'game_task.image as image',
      'tasks.title',
      't.name as team_name',
      'st.name as selected_team_name',
      'tasks.weight as weight',
    ])
    .orderBy('completed_at desc')
    .limit(10)
    .execute();
}

export default {
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getTasksByGameId,
  getTasksByUserId,
  getFeedByGameId,
};
