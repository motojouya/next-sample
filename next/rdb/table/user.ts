import { kysely } from 'kysely';
import { UserUpdate, User, NewUser } from '@/rdb/type/user';

export async function find(rdb: Kysely, user_id: number) {
  return await rdb.selectFrom('user')
    .where('user_id', '=', user_id)
    .where('active', '=', true)
    .selectAll()
    .executeTakeFirst();
}

export async function get(rdb: Kysely, user_id_list: number[]) {
  return await rdb.selectFrom('user')
    .where('user_id', 'in', user_id_list)
    .where('active', '=', true)
    .selectAll()
    .executeTakeFirst();
}

export async function update(rdb: Kysely, user_id: number, updateWith: UserUpdate) {
  await rdb.updateTable('user').set(updateWith).where('user_id', '=', user_id).execute();
}

export async function create(rdb: Kysely, user: NewUser) {
  return await rdb.insertInto('user')
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function delete(rdb: Kysely, user_id: number) {
  return await rdb.deleteFrom('user').where('user_id', '=', user_id)
    .returningAll()
    .executeTakeFirst();
}
