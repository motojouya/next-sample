import { Pool } from 'pg';
import { Kysely, PostgresDialect, Transaction } from 'kysely';
import { Database } from '@/rdb/type';

let rdb?: Kysely = undefined;

export type GetRdb = () => Kysely;
export const getRdb: GetRdb = () => {
  if (!rdb) {
    rdb = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({
          database: process.env.PG_DATABASE,
          host: process.env.PG_HOST,
          user: process.env.PG_USER,
          password: process.env.PG_PASSWORD,
          port: parseInt(process.env.PG_PORT as string),
          max: 1,
        })
      })
    });
  }
  return rdb;
};

export async function transact<T>(rdb: Kysely, callback: (trx: Transaction) => Promise<T>): Promise<T> {
  try {
    return db.transaction().execute(trx => {
      const result = callback(trx);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    });

  // kyselyがrollbackはerror throwを想定しているため、callback内で投げて、再度catchする
  } catch (e) {
    return e;
  }
}

export class RecordAlreadyExistError extends Error {
  constructor(
    readonly table: string,
    readonly data: object,
    readonly message: string,
  ) {
    super();
  }
}

export class RecordNotFoundError extends Error {
  constructor(
    readonly table: string,
    readonly keys: object,
    readonly message: string,
  ) {
    super();
  }
}
