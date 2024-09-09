import { Repository } from 'typeorm'
import Errors, { CustomError } from '../utils/custom-error'
import { AppDataSource } from '../data-source'
import { Book } from '../entities/book.entity'

export class BooksService {
  private booksRepository: Repository<Book>

  constructor() {
    this.booksRepository = AppDataSource.getRepository(Book)
  }

  async findBookById(bookId: string): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id: bookId } })
    if (!book) {
      throw new CustomError({ error: Errors.Books[2001], params: { id: bookId } })
    }
    return book
  }

  async findAllBooks(): Promise<Book[]> {
    return this.booksRepository.find()
  }

  async createBook(name: string): Promise<Book> {
    const book = this.booksRepository.create({ name })
    return this.booksRepository.save(book)
  }

  async updateBook(book: Book): Promise<Book> {
    return this.booksRepository.save(book)
  }
}
