import { UserRepository } from '../domain/user-repository'
import { User, UserDAO, FiltersUser } from '../domain/user'
import { BasicAggregations, OrderParams, RepositoryElasticsearch, SearchResponse } from "../../shared";
import { UserMapper } from '../domain/user-mapper'

export class UserRepositoryElasticsearch
  extends RepositoryElasticsearch<UserDAO, User>
  implements UserRepository
{
  constructor(node: string, region: string) {
    super(new UserMapper(), node, region, 'user')
  }

  public async search(filters?: FiltersUser): Promise<SearchResponse<User>> {
    const bodySearch = this.buildBodySearch(filters)
    const registers = await this.findAll(bodySearch)
    if (registers.total === 10000) {
      registers.total = await this.count(bodySearch)
    }
    return registers
  }

  /**
   * @override
   */
  buildBodySearch(filters?: FiltersUser, aggregations?: BasicAggregations, order?: OrderParams[]): any {
    const body = this.baseAggregations(aggregations)

    if (filters?.name) {
      body.filter('match', 'id', filters.name)
    }

    if (filters?.email) {
      body.filter('match', 'status', filters.email)
    }

    body.sort('created_at', 'desc')

    return body.build()
  }

  async queryByEmail(email: string): Promise<User[] | null> {
    const result= await this.search({ email })
    return result.registros
  }
}
