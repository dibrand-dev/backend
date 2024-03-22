import { RepositoryDynamo, SearchResponse, SearchType } from '../../shared'
import { UserMapper } from '../domain/user-mapper'
import { UserRepository } from '../domain/user-repository'
import { FiltersUser, User, UserDAO } from '../domain/user'

export class UserRepositoryDynamo extends RepositoryDynamo<UserDAO, User> implements UserRepository {
  constructor(tableName: string) {
    super(new UserMapper(), tableName, 'id', 'email')
  }

  async queryByEmail(email: string): Promise<User[] | null> {
    return  (await this.search({ email })).registros
  }

  async findById(id: string, rangeValue?: string): Promise<User | null> {

    if(rangeValue){
      return await super.findById(id, rangeValue)
    }
    const users = await this.queryById({ name: 'id', value: id, searchType: SearchType.ET });
    return users ? users[0] : null;
  }

  async search(filters?: FiltersUser): Promise<SearchResponse<User>> {
    const registers = await this.scan({
      limit: 100,
      select: 'SPECIFIC_ATTRIBUTES',
      selectAttributes: ['id', 'email', 'provider', 'societies', 'code_verification', 'created_at'],
      filter: [{ name: 'email', condition: SearchType.ET, value: filters?.email || '' }]
    })
    return {
      total: registers ? registers.length : 0,
      cantidad: registers ? registers.length : 0,
      registros: registers || []
    }
  }
}
