import { Router } from 'express'
import { UsersController } from '../users/users.controller'
import { BooksController } from '../books/books.controller'

const router = Router()

const usersController = new UsersController()
const booksController = new BooksController()

router.use('/users', usersController.router)
router.use('/books', booksController.router)

export default router
