import { Pool } from 'pg';
import { Kysely, PostgresDialect, sql } from 'kysely';
import fs from 'fs/promises';

type Migration = {
  id: number;
  timestamp: number;
  file: string;
};

const migrate = async () => {
  const allMigrations = process.argv.includes('--all');

  const db = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({}),
    }),
  });

  try {
    const currentMigrations = await getCurrentMigrations();

    const currentMigration = currentMigrations.slice(-1)[0];

    const migrations = await fs.readdir('./src/db//pg/migrations');

    const filteredMigrations = migrations.filter(
      migration => migration.split('.')[1] === 'sql'
    );

    for (const migration of filteredMigrations) {
      const currentVersion = migration.split('_')[0];

      if (!currentVersion) continue;

      if (
        allMigrations ||
        parseInt(currentVersion) > (currentMigration?.id ?? -1)
      ) {
        const sqlFromFile = await fs.readFile(
          `./src/db/pg/migrations/${migration}`,
          'utf-8'
        );

        await db.executeQuery(sql`${sql.raw(sqlFromFile)}`.compile(db));

        await addNewMigration({
          id: parseInt(currentVersion),
          file: migration,
          timestamp: Date.now(),
        });
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    await db.destroy();
  }
};

const getCurrentMigrations = async (): Promise<Migration[]> => {
  try {
    const json = await fs.readFile(
      './src/db/pg/migrations/migrations.json',
      'utf-8'
    );

    const { migrations } = JSON.parse(json);

    return migrations || [];
  } catch (error) {
    return [];
  }
};

const addNewMigration = async (newMigration: Migration) => {
  try {
    const currentMigrations = await getCurrentMigrations();

    const exists = currentMigrations.some(
      migration => migration.id === newMigration.id
    );

    if (!exists) currentMigrations.push(newMigration);

    const json = JSON.stringify({ migrations: currentMigrations }, null, 2);

    await fs.writeFile('./src/db/pg/migrations/migrations.json', json, 'utf-8');
  } catch (error) {
    console.log(error);
  }
};

migrate();
