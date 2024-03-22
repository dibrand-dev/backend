import { AppError } from '../domain/app-error'
import { type StatusCodeResponse } from '../domain/response'

export class AppErrorGeneric extends AppError {
  constructor(code: StatusCodeResponse, message: string, context?: string, stack?: Error) {
    super(code, message, context, stack)
  }
}
