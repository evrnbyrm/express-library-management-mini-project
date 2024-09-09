import z from 'zod'

export const createUserInput = z.object({
  name: z.string().min(5),
})
export type CreateUserInput = z.infer<typeof createUserInput>

export const getUserParams = z.object({
  id: z.string().min(1),
})
export type GetUserParams = z.infer<typeof getUserParams>

export const getUserOutput = z.object({
  id: z.string(),
  name: z.string(),
})
export type GetUserOutput = z.infer<typeof getUserOutput>

export const getUsersOutput = z.object({
  users: z.array(getUserOutput),
})
export type GetUsersOutput = z.infer<typeof getUsersOutput>

export const borrowBookParams = z.object({
  userId: z.string(),
  bookId: z.string(),
})
export type BorrowBookParams = z.infer<typeof borrowBookParams>

export const returnBookParams = borrowBookParams
export type ReturnBookParams = z.infer<typeof returnBookParams>

export const returnBookInput = z.object({
  score: z.number().int().min(0).max(10),
})
export type ReturnBookInput = z.infer<typeof returnBookInput>
