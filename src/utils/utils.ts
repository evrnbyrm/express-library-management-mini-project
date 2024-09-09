import Errors, { CustomError } from './custom-error'
import { CustomErroResponse } from './types'

export const defaultErrorResponse = (error?: any): CustomErroResponse => {
  if (error instanceof CustomError) {
    return error.response
  }

  console.log('error: ', error)

  return new CustomError({ error: Errors.System[1000], addons: { detail: error?.message, stack: error?.stack } }).response
}
