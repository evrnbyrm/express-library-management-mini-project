import { Request, Response, Router } from 'express'
import { validate } from '../validation/validation'
import { createBookInput, CreateBookInput, getBookOutput, GetBookOutput, getBookParams, GetBookParams, getBooksOutput, GetBooksOutput } from './models'
import { BooksService } from './books.service'
import { CustomErrorResponseBody } from '../utils/types'
import { defaultErrorResponse } from '../utils/utils'

export class BooksController {
  public router: Router
  private booksService: BooksService

  constructor() {
    this.router = Router()
    this.setRoutes()
    this.booksService = new BooksService()
  }

  private setRoutes() {
    this.router.get('/', this.getBooks.bind(this))
    this.router.get('/:id', validate({ paramsModel: getBookParams }), this.getBook.bind(this))
    this.router.post('/', validate({ inputModel: createBookInput }), this.createBook.bind(this))
  }

  private async getBooks(req: Request, res: Response<GetBooksOutput | CustomErrorResponseBody>) {
    try {
      const books = await this.booksService.findAllBooks()
      res.status(200).json(getBooksOutput.parse({ books }))
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }

  private async getBook(req: Request<GetBookParams>, res: Response<GetBookOutput | CustomErrorResponseBody>) {
    try {
      const { id } = req.params
      const book = await this.booksService.findBookById(id)
      res.status(200).json(getBookOutput.parse(book))
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }

  private async createBook(req: Request<any, any, CreateBookInput>, res: Response) {
    try {
      const { name } = req.body
      const book = await this.booksService.createBook(name)
      res.status(201).json(getBookOutput.parse(book))
    } catch (error) {
      const { body, statusCode } = defaultErrorResponse(error)
      res.status(statusCode).json(body)
    }
  }
}
