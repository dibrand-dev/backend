export enum Provider {
  register = 'register',
  facebook = 'Facebook',
  google = 'Google'
}

export interface UserInfoResponseDTO {
  id: string
  username: string
  email: string
  provider: Provider
}

export interface GetTokenResponseDTO {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface GetTokenByUserCredentialsResponseDTO {
  access_token: string
  expires_in: number
  token_type: string
  refresh_token: string
  id_token: string
}

export interface CreateUserDataDTO {
  email: string
  password: string
}

export interface CreateUserResponseDTO {
  username: string
  attributes: any
  userCreateDate: Date
  userStatus: string
}

export interface ForceUpdatePasswordDTO {
  username: string
  password: string
}

export interface Federation {
  getToken(): Promise<GetTokenResponseDTO>
  getTokenByUserCredentials(email: string, password: string): Promise<GetTokenByUserCredentialsResponseDTO>
  getInfoUser(accessToken: string): Promise<UserInfoResponseDTO>
  getProvider(dataUser: UserInfoResponseDTO): Provider
  generateRedirectURL(refreshToken: string, email: string): string
  createUser(userData: CreateUserDataDTO): Promise<CreateUserResponseDTO>
  changePassword(userData: ForceUpdatePasswordDTO): Promise<void>
}
