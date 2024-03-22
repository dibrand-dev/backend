import { Authorizer, ClaimDTO, AdminGroup } from '../domain/authorizer'

export class AuthorizerCognito implements Authorizer {
  constructor(readonly claims: ClaimDTO) {}

  isAuthorized(userId: string): boolean {
    if (this.getUserId() === userId) {
      return true
    }
    return this.isAdmin()
  }

  isOwner(username: string): boolean {
    return this.getUserId() === username
  }

  isAdmin(): boolean {
    const groups = this.getGroups()
    if (!groups) return false
    return !!groups.find((group) => group === AdminGroup.CONSULT || group === AdminGroup.SUPER)
  }

  getGroups(): string[] | null {
    return this.claims['cognito:groups'] ? this.claims['cognito:groups'].split(',') : null
  }

  getUserId(): string {
    return this.claims['cognito:username']
  }

  getEmail(): string {
    return this.claims.email
  }
}
