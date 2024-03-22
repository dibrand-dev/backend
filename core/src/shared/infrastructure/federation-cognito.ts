import axios from 'axios'
import { stringify } from 'querystring'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

import {
  CreateUserDataDTO,
  CreateUserResponseDTO,
  Federation,
  ForceUpdatePasswordDTO,
  GetTokenByUserCredentialsResponseDTO,
  GetTokenResponseDTO,
  Provider,
  UserInfoResponseDTO
} from "../domain/federation";
import { AppErrorGeneric } from "./app-error-generic";
import { StatusCodeResponse } from "../domain/response";

export class FederationCognito implements Federation {
  constructor(
    private code: number,
    private hostBackend: string,
    private hostFrontend: string,
    private hostApiAuth: string,
    private clientId: string,
    private userPoolId?: string
  ) {}

  async createUser(userData: CreateUserDataDTO): Promise<CreateUserResponseDTO> {
    if (!this.userPoolId) throw new AppErrorGeneric(StatusCodeResponse.BAD_REQUEST,'User pool id is required')
    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()
    const params = {
      UserPoolId: this.userPoolId, /* required */
      Username: userData.email, /* required */
      ForceAliasCreation: false,
      MessageAction: 'SUPPRESS',
      TemporaryPassword: userData.password,
      UserAttributes: [
        {
          Name: 'email', /* required */
          Value: userData.email
        }
      ]
    };
    console.debug('FC.CREATE_USER.PARAMS', { params })
    const result = await cognitoIdentityServiceProvider.adminCreateUser(params).promise()
    console.debug('FC.CREATE_USER.RESP', { result })
    return {
      username: result.User?.Username as string,
      attributes: result.User?.Attributes as any,
      userCreateDate: result.User?.UserCreateDate as Date,
      userStatus: result.User?.UserStatus as string,
    }
  }

  async changePassword(userData: ForceUpdatePasswordDTO): Promise<void> {
    if (!this.userPoolId) throw new AppErrorGeneric(StatusCodeResponse.BAD_REQUEST,'User pool id is required')
    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()
    const params = {
      Password: userData.password,
      UserPoolId: this.userPoolId,
      Username: userData.username,
      Permanent: true
    };
    console.debug('FC.CHANGE_PASSWORD.PARAMS', { params })
    await cognitoIdentityServiceProvider.adminSetUserPassword(params).promise()
  }

  async getTokenByUserCredentials(username: string, password: string): Promise<GetTokenByUserCredentialsResponseDTO> {
    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        'USERNAME': username,
        'PASSWORD': password
      }
    };
    const result= await cognitoIdentityServiceProvider.initiateAuth(params).promise()
    return {
      access_token: result.AuthenticationResult?.AccessToken as string,
      expires_in: result.AuthenticationResult?.ExpiresIn as number,
      token_type: result.AuthenticationResult?.TokenType as string,
      refresh_token: result.AuthenticationResult?.RefreshToken as string,
      id_token: result.AuthenticationResult?.IdToken as string
    }
  }

  async getToken(): Promise<GetTokenResponseDTO> {
    const url = `${this.hostApiAuth}/oauth2/token`
    const body = stringify({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      code: this.code,
      redirect_uri: `${this.hostBackend}/user/auth`
    })
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    console.debug('AUTH_API.GET_TOKEN.AXIOS.PARAMS:', { url, body, config })
    const { status, statusText, data } = await axios.post(url, body, config)
    console.debug('AUTH_API.GET_TOKEN.AXIOS.RESP:', { status, statusText, data })
    return data
  }

  async getInfoUser(accessToken: string): Promise<UserInfoResponseDTO> {
    const url = `${this.hostApiAuth}/oauth2/userInfo`
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    console.debug('AUTH_API.GET_INFO_USER.AXIOS.PARAMS:', { url, config })
    const { status, statusText, data } = await axios.get(url, config)
    console.debug('AUTH_API.GET_INFO_USER.AXIOS.RESP:', { status, statusText, data })
    return data
  }

  getProvider(dataUser: UserInfoResponseDTO): Provider {
    if (dataUser.username.includes(Provider.facebook)) return Provider.facebook
    else if (dataUser.username.includes(Provider.google)) return Provider.google
    else return Provider.register
  }

  generateRedirectURL(refreshToken: string, email: string) {
    const queryString = stringify({ rt: refreshToken, email: email })
    return `${this.hostFrontend}/init/index.html?${queryString}`
  }
}
