export interface ClaimDTO {
  sub: string
  email_verified: boolean
  iss: string
  'cognito:username': string
  'cognito:groups': string
  origin_jti: string
  aud: string
  event_id: string
  token_use: string
  auth_time: string
  exp: string
  iat: string
  jti: string
  email: string
}

export enum AdminGroup {
  SUPER = 'ADMIN_SUPER',
  CONSULT = 'ADMIN_CONSULT'
}

export interface AuthorizerDTO {
  claims: ClaimDTO
}

export interface Authorizer extends AuthorizerDTO {
  isAuthorized: (userId: string) => boolean
  isAdmin: () => boolean
  isOwner: (username: string) => boolean
  getGroups: () => string[] | null
  getUserId: () => string
  getEmail: () => string
}
