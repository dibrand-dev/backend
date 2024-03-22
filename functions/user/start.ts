import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  LambdaResponse,
  GetProfile,
  FederationCognito,
  GetUser,
  AuthorizerCognito,
  ListUsers,
  CreateUser,
  UserRepositoryDynamo
} from "core";
const {
  USER_TABLE,
  FRONT_OFFICE_USER_POOL_ID
} =
  process.env;

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.debug('HANDLER.CU.EVENT', event)
    const body = JSON.parse(event.body)
    console.debug('HANDLER.DATA', { body })
    const uc = new CreateUser(
      new UserRepositoryDynamo(USER_TABLE),
      new FederationCognito(null, null, null, null, null,FRONT_OFFICE_USER_POOL_ID)
    )
    const result = await uc.execute(body)
    return LambdaResponse.create(201, result)
  } catch (error) {
    return LambdaResponse.handleException(error)
  }
}

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.debug('HANDLER.GET_USER.EVENT', event)
    const authorizer = event.requestContext.authorizer.claims
    const userId = event.pathParameters?.user_id
    console.debug('HANDLER.GET_USER.DATA', { authorizer, userId })
    const uc = new GetUser(new UserRepositoryDynamo(USER_TABLE), new AuthorizerCognito(authorizer))
    const result = await uc.execute(userId)
    return LambdaResponse.create(200, result)
  } catch (error) {
    return LambdaResponse.handleException(error, event)
  }
}

export const listUsers = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.debug('HANDLER.LIST_USERS.EVENT', event)
    const filters = event.queryStringParameters
    console.debug('HANDLER.LIST_USERS.DATA', { filters })
    const uc = new ListUsers(new UserRepositoryDynamo(USER_TABLE))
    const result = await uc.execute(filters)
    return LambdaResponse.create(200, result)
  } catch (error) {
    return LambdaResponse.handleException(error)
  }
}

export const getProfile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.debug('HANDLER.GET_PROFILE.EVENT', event)
    const authorizer = event.requestContext.authorizer.claims
    console.debug('HANDLER.GET_PROFILE.DATA', { authorizer })
    const uc = new GetProfile(new AuthorizerCognito(authorizer), new UserRepositoryDynamo(USER_TABLE))
    const result = await uc.execute()
    return LambdaResponse.create(200, result)
  } catch (error) {
    return LambdaResponse.handleException(error, event)
  }
}
