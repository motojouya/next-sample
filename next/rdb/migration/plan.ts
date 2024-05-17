import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('plan')
    .addColumn('plan', 'varchar(128)', (col) => col.primaryKey())
    .addColumn('avaiable_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('expire_date', 'timestamp')
    .execute();

  await db.schema
    .createTable('user_plan')
    .addColumn('user_id', 'integer', (col) => col.primaryKey())
    .addColumn('plan', 'varchar(128)', (col) => col.notNull())
    .addColumn('updated_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('plan').execute();
  await db.schema.dropTable('user_plan').execute();
}
