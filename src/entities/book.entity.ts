import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { TableNames } from '../utils/types'

@Entity({ name: TableNames.BOOKS })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ default: -1, type: 'float' })
  score: number

  @Column({ default: 0 })
  borrowCounter: number

  @Column({ default: true, type: 'boolean' })
  available: boolean
}
