import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Games {
  id: Generated<string>;
  title: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  started: Generated<boolean>;
  finished: Generated<boolean>;
}

export interface GameTask {
  id: Generated<string>;
  task_id: string;
  team_id: string;
  completed: Generated<boolean>;
  image: string | null;
  selected_team: string | null;
  completed_at: Generated<Timestamp>;
}

export interface Sessions {
  id: Generated<string>;
  user_id: string;
  expires: Timestamp;
}

export interface Tasks {
  id: Generated<string>;
  game_id: string;
  type: string;
  title: string;
  description: string;
  weight: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Teams {
  id: Generated<string>;
  game_id: string;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface UserInTeam {
  user_id: string;
  team_id: string;
}

export interface Users {
  id: Generated<string>;
  discord_id: string;
  name: string;
  avatar: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  role: Generated<string>;
}

export interface DB {
  game_task: GameTask;
  games: Games;
  sessions: Sessions;
  tasks: Tasks;
  teams: Teams;
  user_in_team: UserInTeam;
  users: Users;
}
