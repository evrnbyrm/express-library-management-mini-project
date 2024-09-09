import z from 'zod'

export const getBookParams = z.object({
  id: z.string(),
})
export type GetBookParams = z.infer<typeof getBookParams>

export const getBookOutput = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number().default(-1),
  available: z.boolean().default(true),
})
export type GetBookOutput = z.infer<typeof getBookOutput>

export const getBooksOutput = z.object({
  books: z.array(getBookOutput.omit({ score: true, available: true })),
})
export type GetBooksOutput = z.infer<typeof getBooksOutput>

export const createBookInput = z.object({
  name: z.string().min(1),
})
export type CreateBookInput = z.infer<typeof createBookInput>
