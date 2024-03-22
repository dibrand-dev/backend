import { randomUUID } from "crypto";
import { CmdCreateUserDTO, User} from "../domain/user";
import { type UserRepository } from '../domain/user-repository'
import { AppErrorGeneric, Federation, StatusCodeResponse } from "../../shared";
import {Society} from "../../society/domain/society";

export class CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly federationClient: Federation
  ) {}

  async execute(data: CmdCreateUserDTO): Promise<void> {
    let userExist = await this.userRepository.queryByEmail(data.email)
    if (userExist && userExist.length > 0) {
      throw new AppErrorGeneric(StatusCodeResponse.BAD_REQUEST, 'User already exists')
    }

    const userCognito = await this.federationClient.createUser({ email: data.email, password: `${randomUUID()}-J` })
    await this.federationClient.changePassword({ username: data.email, password: data.password })
    const user = new User(
        userCognito.username,
        data.name,
        data.lastname,
        data.email,
        userCognito.userCreateDate.toISOString()
    )
    const society = new Society(
        randomUUID(),
        'default_name',
        'default_alias',
        data.society?.person_type || 'default_person_type',
        {
          type_document: 'default_type_document',
          number_document: 0
        },
        {
          city: 'default_city',
          address: 'default_address'
        },
        'default_phone',
        'default@default.com'
    )
    user.addSociety([society])
    await this.userRepository.save(user)
  }
}
