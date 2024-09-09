import { ErrorType } from '../types'

export const Books: Record<number, ErrorType> = {
  2001: {
    errorCode: 2001,
    message: 'Cannot find book with id: {{id}}',
    moduleName: 'books',
    statusCode: 404,
    title: 'Book not found',
  },
}
