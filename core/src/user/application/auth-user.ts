import { UserRepository } from '../domain/user-repository'
import { AppErrorGeneric, Federation, StatusCodeResponse } from "../../shared";

export class AuthUser {
  constructor(private readonly userRepository: UserRepository, private readonly federationService: Federation) {}

  async execute(): Promise<string> {
    const tokens = await this.federationService.getToken()
    const userInfo = await this.federationService.getInfoUser(tokens.access_token)
    console.debug('AUTH_API.REGISTER_USER.USER:', { userInfo, tokens })

    const user = await this.userRepository.findById(userInfo.username, userInfo.email)
    if (!user) {
      throw new AppErrorGeneric(StatusCodeResponse.BAD_REQUEST,'User not found')
    }

    return this.federationService.generateRedirectURL(tokens.access_token, user.email)
  }
}
