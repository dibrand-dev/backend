import { ClaimDTO, Authorizer } from '../domain/authorizer'

export class AuthorizerCache implements Authorizer {
  constructor(readonly claims: ClaimDTO) {}

  isAuthorized(userId: string): boolean {
    return true
  }

  isAdmin(): boolean {
    return true
  }

  isOwner(): boolean {
    return true
  }

  getUserId(): string {
    return 'abbulrodriguez@test.com'
  }

  getGroups(): string[] | null {
    return null
  }

  getEmail(): string {
    return 'abbulrodriguez@test.com'
  }
}
