import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from '~/db/pg/schema';

const pg = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: String(process.env.POSTGRES_URI) }),
  }),
  log: ({ query }) => {
    //console.log(query);
  },
});

export default pg;
