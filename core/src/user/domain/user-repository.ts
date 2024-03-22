import { Repository, SearchResponse } from '../../shared'
import { FiltersUser, User, UserDAO } from './user'

export interface UserRepository extends Repository<UserDAO, User> {
  queryByEmail(email: string): Promise<User[] | null>
  search(filters?: FiltersUser): Promise<SearchResponse<User>>
}
