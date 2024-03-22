import { StatusCodeResponse, HeadersResponse } from "../domain/response";
import { AppError } from '../domain/app-error';
import { APIGatewayProxyResult } from "aws-lambda";

export class ResponseLambda {
  static create(
    statusCode: StatusCodeResponse,
    body: any,
    headers?: HeadersResponse,
    isBase64Encoded = false
  ): APIGatewayProxyResult {
    return {
      statusCode,
      headers: headers || {
        'Access-Control-Allow-Origin': '*'
      },
      body: isBase64Encoded ? Buffer.from(body).toString('base64') : JSON.stringify(body),
      isBase64Encoded
    };
  }

  static handleException(error: any, event?: any): APIGatewayProxyResult {
    console.warn('LR.HANDLE_EXCEPTION.EVENT', { event });
    console.error('LR.HANDLE_EXCEPTION.ERROR', { error });
    if (!(error instanceof AppError)) {
      throw error;
    }
    return {
      statusCode: error.code,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: {
          context: error.context,
          message: error.message
        }
      }),
      isBase64Encoded: false
    };
  }
}
