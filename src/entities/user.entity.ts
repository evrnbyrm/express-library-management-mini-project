import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { TableNames } from '../utils/types'

@Entity({ name: TableNames.USERS })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string
}
