import { ErrorType } from '../types'

export const System: Record<number, ErrorType> = {
  1000: {
    errorCode: 1000,
    message: 'Service Error',
    moduleName: 'System',
    statusCode: 500,
    title: 'Service Error',
  },
}
