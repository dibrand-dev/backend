import { User, UserDTO } from '../domain/user'
import { UserRepository } from '../domain/user-repository'
import { Authorizer } from '../../shared'

export class GetProfile {
  constructor(private readonly authorizer: Authorizer, private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserDTO> {
    const user = (await this.userRepository.findById(
      this.authorizer.getUserId(),
      this.authorizer.getEmail()
    )) as User
    return user.toDTO()
  }
}
