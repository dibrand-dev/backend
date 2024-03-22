import { type StatusCodeResponse } from './response'

export abstract class AppError {
  protected constructor(
    public code: StatusCodeResponse,
    public message: string,
    public context?: string,
    public stack?: Error
  ) {}
}
