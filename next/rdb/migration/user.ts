import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('user_id', 'serial', (col) => col.primaryKey())
    .addColumn('identifier', 'varchar(128)', (col) => col.unique())
    .addColumn('name', 'varchar(128)')
    .addColumn('register_session_id', 'integer', (col) => col.notNull())
    .addColumn('email', 'varchar(128)')
    .addColumn('active', 'tinyint', (col) => col.notNull())
    .addColumn('created_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable('user_email')
    .addColumn('user_id', 'integer', (col) => col.primaryKey())
    .addColumn('email', 'varchar(128)', (col) => col.primaryKey())
    .addColumn('email_pin', 'integer', (col) => col.notNull())
    .addColumn('created_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('verified_date', 'timestamp')
    .addColumn('assign_expired_date', 'timestamp', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('user_password')
    .addColumn('user_id', 'integer', (col) => col.primaryKey())
    .addColumn('password', 'varchar(128)', (col) => col.notNull())
    .addColumn('created_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable('user_session_expire')
    .addColumn('user_id', 'integer', (col) => col.primaryKey())
    .addColumn('created_date', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('expired_date', 'timestamp')
    .execute();

  await db.schema
    .createTable('role')
    .addColumn('role_id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'varchar(128)', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('user_email').execute();
  await db.schema.dropTable('user_password').execute();
  await db.schema.dropTable('user_session_expire').execute();
  await db.schema.dropTable('role').execute();
}
