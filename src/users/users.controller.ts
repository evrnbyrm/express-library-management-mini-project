import { Request, Response, Router } from 'express'
import { validate } from '../validation/validation'
import {
  BorrowBookParams,
  borrowBookParams,
  CreateUserInput,
  createUserInput,
  GetUserOutput,
  GetUserParams,
  getUserParams,
  GetUsersOutput,
  ReturnBookInput,
  returnBookInput,
  ReturnBookParams,
  returnBookParams,
} from './models'
import { UsersService } from './users.service'
import { defaultErrorResponse } from '../utils/utils'
import { CustomErrorResponseBody } from '../utils/types'

export class UsersController {
  public router: Router
  private usersService: UsersService

  constructor() {
    this.router = Router()
    this.usersService = new UsersService()
    this.setRoutes()
  }

  private setRoutes() {
    this.router.get('/', this.getUsers.bind(this))
    this.router.get('/:id', validate({ paramsModel: getUserParams }), this.getUser.bind(this))
    this.router.post('/', validate({ inputModel: createUserInput }), this.createUser.bind(this))
    this.router.post('/:userId/borrow/:bookId', validate({ paramsModel: borrowBookParams }), this.borrowBook.bind(this))
    this.router.post('/:userId/return/:bookId', validate({ paramsModel: returnBookParams, inputModel: returnBookInput }), this.returnBook.bind(this))
  }

  private async getUsers(req: Request, res: Response<GetUsersOutput | CustomErrorResponseBody>) {
    try {
      const users = await this.usersService.findAllUsers()
      res.status(200).json({ users })
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }

  private async getUser(req: Request<GetUserParams>, res: Response<GetUserOutput | CustomErrorResponseBody>) {
    try {
      const { id } = req.params
      const user = await this.usersService.findUserById(id)
      res.status(200).json(user)
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }

  private async createUser(req: Request<any, any, CreateUserInput>, res: Response) {
    try {
      const { name } = req.body
      const user = await this.usersService.createUser(name)
      res.status(201).json(user)
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }

  private async borrowBook(req: Request<BorrowBookParams>, res: Response) {
    try {
      const { bookId, userId } = req.params
      await this.usersService.borrowBookUsingIds(bookId, userId)
      res.status(201).send()
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }

  private async returnBook(req: Request<ReturnBookParams, any, ReturnBookInput>, res: Response) {
    try {
      const { bookId, userId } = req.params
      const { score } = req.body
      await this.usersService.returnBook(bookId, userId, score)
      res.status(201).send()
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }
}
