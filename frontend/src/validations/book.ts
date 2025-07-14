import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  author: z.string().min(1, 'Author is required').max(50),
  genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters').max(20),
  description: z.string().max(500).optional(),
  copies: z.number().int().min(0, 'Cannot have negative copies'),
  available: z.boolean()
});
