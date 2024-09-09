import { DataSource } from 'typeorm'
import { Book } from './entities/book.entity'
import { Borrow } from './entities/borrow.entity'
import { User } from './entities/user.entity'
import * as dotenv from 'dotenv'

dotenv.config()

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'library-postgres',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'library-management',
//   entities: [User, Book, Borrow],
//   synchronize: false,
//   migrations: [__dirname + '/migrations/*.ts'],
// })

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Book, Borrow, User],
  migrations: [__dirname + '/migrations/*.ts'],
})
