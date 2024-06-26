import { kysely } from 'kysely';
import { UserUpdate, User, NewUser } from '@/rdb/type/user';

// TODO kysely型じゃなくてTransaction型かも。どちらを使っても良い場合、どちらを使うべき？
// TODO 戻り値型をflat->treeに変えてから返したい。戻り値型も明示的に宣言する
export async function findPeople(rdb: Kysely, criteria: Partial<User>) {
  let query = rdb.selectFrom('person')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.first_name) {
    query = query.where('first_name', '=', criteria.first_name)
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      'last_name',
      criteria.last_name === null ? 'is' : '=',
      criteria.last_name
    )
  }

  if (criteria.gender) {
    query = query.where('gender', '=', criteria.gender)
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  return await query.selectAll().execute()
}
