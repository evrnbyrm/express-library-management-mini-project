export enum TableNames {
  USERS = 'users',
  BOOKS = 'books',
  BORROW = 'borrow',
}

export interface ErrorType {
  moduleName: string
  errorCode: number
  statusCode: number
  title: string
  message: string
}

export interface CustomErrorArguments {
  error: ErrorType
  params?: Record<string, string>
  addons?: any
}

export interface CustomErrorResponseBody {
  errorCode: number
  title: string
  message: string
  moduleName: string
  addons?: any
}

export interface CustomErroResponse {
  statusCode: number
  body: CustomErrorResponseBody
}
