import { type UserDAO, type FiltersUser } from '../domain/user'
import { type UserRepository } from '../domain/user-repository'
import { type SearchResponse } from '../../shared'

export class ListUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(filters?: FiltersUser): Promise<SearchResponse<UserDAO>> {
    const result = await this.userRepository.search(filters)
    return {
      cantidad: result.cantidad,
      registros: result.registros.map((user) => user.toDTO()),
      total: result.total
    }
  }
}
