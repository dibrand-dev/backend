export interface HeadersBase {
  [header: string]: boolean | number | string;
}

export interface HeadersResponse extends HeadersBase {
  'Access-Control-Allow-Origin': string;
  'Content-Type': string;
  'content-disposition': string;
}

export enum StatusCodeResponse {
  OK = 200,
  CREATE = 201,
  REDIRECT_PERMANENT = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export enum MessageErrorResponse {
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

export interface ResponseDTO {
  statusCode: StatusCodeResponse;
  headers: HeadersResponse;
  body: string;
  isBase64Encoded: boolean;
}
