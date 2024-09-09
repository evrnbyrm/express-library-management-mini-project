import { ErrorType } from '../types'

export const Users: Record<number, ErrorType> = {
  1001: {
    errorCode: 1001,
    message: 'Cannot find user with id: {{id}}',
    moduleName: 'users',
    statusCode: 404,
    title: 'User not found',
  },
  1002: {
    errorCode: 1002,
    message: 'Cannot borrow book with id: {{bookId}}',
    moduleName: 'users',
    statusCode: 409,
    title: 'Book is not available to borrow',
  },
  1003: {
    errorCode: 1003,
    message: 'Cannot find borrowing transaction with bookId: {{bookId}} belongs to userId: {{userId}}',
    moduleName: 'users',
    statusCode: 404,
    title: 'Borrowing transaction is not found',
  },
  1004: {
    errorCode: 1004,
    message: 'Book you want to return is already returned by its borrower',
    moduleName: 'users',
    statusCode: 400,
    title: 'Book is already returned',
  },
}
