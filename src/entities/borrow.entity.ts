import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TableNames } from '../utils/types'
import { Book } from './book.entity'
import { User } from './user.entity'

@Entity({ name: TableNames.BORROW })
export class Borrow {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @ManyToOne(() => Book, (book) => book.id)
  book: Book

  @Column({ type: 'date' })
  borrowDate: string

  @Column({ type: 'date', nullable: true })
  returnDate: string | null

  @Column({ type: 'int', nullable: true })
  userScore: number | null
}
