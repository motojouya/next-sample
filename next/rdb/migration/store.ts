import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('store')
    .addColumn('store_id', 'serial', (col) => col.primaryKey())
    .addColumn('store_url', 'varchar(128)', (col) => col.unique())
    .addColumn('name', 'varchar(128)')
    .addColumn('created_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable('store_user')
    .addColumn('user_id', 'integer', (col) => col.primaryKey())
    .addColumn('store_id', 'integer', (col) => col.primaryKey())
    .addColumn('role_id', 'integer', (col) => col.notNull())
    .addColumn('created_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('user_email').execute();
  await db.schema.dropTable('user_password').execute();
  await db.schema.dropTable('user_session_expire').execute();
}
