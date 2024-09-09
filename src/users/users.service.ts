import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import Errors, { CustomError } from '../utils/custom-error'
import { AppDataSource } from '../data-source'
import { BooksService } from '../books/books.service'
import { Borrow } from '../entities/borrow.entity'

export class UsersService {
  private usersRepository: Repository<User>
  private borrowRepository: Repository<Borrow>
  private booksService: BooksService

  constructor() {
    this.usersRepository = AppDataSource.getRepository(User)
    this.borrowRepository = AppDataSource.getRepository(Borrow)
    this.booksService = new BooksService()
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new CustomError({ error: Errors.Users[1001], params: { id: userId } })
    }
    return user
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async createUser(name: string): Promise<User> {
    const user = this.usersRepository.create({ name })
    return this.usersRepository.save(user)
  }

  async borrowBookUsingIds(bookId: string, userId: string): Promise<void> {
    const user = await this.findUserById(userId)
    const book = await this.booksService.findBookById(bookId)

    if (!book.available) {
      throw new CustomError({ error: Errors.Users[1002], params: { bookId } })
    }
    book.available = false
    const borrow = this.borrowRepository.create({ book, user, borrowDate: new Date().toISOString() })

    await Promise.all([this.borrowRepository.save(borrow), this.booksService.updateBook(book)])
  }

  async returnBook(bookId: string, userId: string, score: number): Promise<void> {
    const user = await this.findUserById(userId)
    const book = await this.booksService.findBookById(bookId)
    const borrow = await this.borrowRepository.findOne({ where: { book, user, returnDate: null } })

    if (!borrow) {
      throw new CustomError({ error: Errors.Users[1003], params: { userId, bookId } })
    }
    if (borrow.returnDate) {
      throw new CustomError({ error: Errors.Users[1004] })
    }

    borrow.returnDate = new Date().toISOString()
    borrow.userScore = score

    book.score = Math.round((100 * (book.borrowCounter * book.score + score)) / ++book.borrowCounter) / 100
    book.available = true

    await Promise.all([this.borrowRepository.save(borrow), this.booksService.updateBook(book)])
  }
}
