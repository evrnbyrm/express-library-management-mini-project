import { CustomErrorArguments, CustomErroResponse, CustomErrorResponseBody } from './types'

import * as Errors from './custom-errors/index'

export default Errors

export class CustomError extends Error {
  public readonly moduleName: string

  public readonly errorCode: number

  public readonly message: string

  public readonly details?: string = undefined

  public readonly statusCode: number

  public readonly title: string

  public readonly addons: any

  constructor(args: CustomErrorArguments) {
    super('')

    let { error } = args
    if (!error) {
      error = {
        moduleName: 'System',
        errorCode: 1000,
        statusCode: 500,
        title: 'Encountered with an unexpected error',
        message: 'Service error',
      }
    }

    this.message = error.message

    const { params, addons } = args
    if (params && typeof params === 'object') {
      for (const key in params) {
        this.message = this.message.replace(`{{${key}}}`, params[key])
      }
    }

    if (addons) {
      this.addons = typeof addons === 'string' ? { detail: addons } : addons
    }
    this.errorCode = error.errorCode
    this.statusCode = error.statusCode
    this.moduleName = error.moduleName
    this.title = error.title
  }

  get response(): CustomErroResponse {
    return {
      statusCode: this.statusCode,
      body: {
        errorCode: this.errorCode,
        message: this.message,
        moduleName: this.moduleName,
        title: this.title,
        addons: this.addons,
      },
    }
  }

  get responseBody(): CustomErrorResponseBody {
    return {
      errorCode: this.errorCode,
      message: this.message,
      moduleName: this.moduleName,
      title: this.title,
      addons: this.addons,
    }
  }
}
