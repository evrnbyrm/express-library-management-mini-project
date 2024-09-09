import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

export const validate =
  ({ inputModel, paramsModel }: { inputModel?: ZodSchema<any>; paramsModel?: ZodSchema<any> }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (inputModel) {
        req.body = inputModel.parse(req.body || {})
      }
      if (paramsModel) {
        req.params = paramsModel.parse(req.params || {})
      }
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          path: req.path,
          error: {
            message: error.message,
            name: error.name,
            issues: error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
        })
      } else if (error instanceof Error) {
        console.log(JSON.stringify(error))
      }

      return res.status(500).json({
        path: req.path,
        error: {
          message: 'An unexpected error occurred',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }
  }
