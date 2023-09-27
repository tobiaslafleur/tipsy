import { jsonArrayFrom } from 'kysely/helpers/postgres';
import WebSocket from 'ws';

import pg from '~/db/pg';

//TODO: Handle error if no websocket connection is made
const ws = new WebSocket('ws://localhost:4001');

export default async function sendDiscordNotification(task_id: string) {
  const task = await pg
    .selectFrom('game_task')
    .leftJoin('tasks', 'tasks.id', 'game_task.task_id')
    .leftJoin('teams as t', 't.id', 'game_task.team_id')
    .leftJoin('teams as st', 'st.id', 'game_task.selected_team')
    .select(eb => [
      'tasks.title as title',
      't.name as team_name',
      'st.name as selected_team_name',
      'tasks.weight as weight',
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
          .whereRef('user_in_team.team_id', '=', 'game_task.selected_team')
      ).as('selected_team'),
    ])
    .where('game_task.id', '=', task_id)
    .executeTakeFirst();

  ws.send(JSON.stringify(task));
}
