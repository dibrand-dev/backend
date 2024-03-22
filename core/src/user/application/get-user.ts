import { UserDAO } from '../domain/user'
import { UserRepository } from '../domain/user-repository'
import { AppErrorGeneric, Authorizer, StatusCodeResponse } from "../../shared";

export class GetUser {
  constructor(private readonly userRepository: UserRepository, private readonly authorizer: Authorizer) {}

  async execute(userId?: string): Promise<UserDAO> {
    const user =
      userId && this.authorizer.isAdmin()
        ? await this.userRepository.findById(userId)
        : await this.userRepository.findById(this.authorizer.getUserId(), this.authorizer.getEmail())
    if (!user) {
      throw new AppErrorGeneric(StatusCodeResponse.BAD_REQUEST,`User not found: ${userId}`)
    }
    return user.toDTO()
  }
}
