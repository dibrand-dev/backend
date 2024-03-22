import { Mapper } from '../../shared'
import { User, UserDAO } from './user'

export class UserMapper implements Mapper<UserDAO, User> {
  convertToDBEntity(entity: User): UserDAO {
    return entity.toDTO()
  }

  convertToEntity(dao: UserDAO): User {
    return User.fromDTO(dao)
  }
}
