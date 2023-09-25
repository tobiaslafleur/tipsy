import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from 'kysely-codegen';

const pg = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({}),
  }),
});

export default pg;
