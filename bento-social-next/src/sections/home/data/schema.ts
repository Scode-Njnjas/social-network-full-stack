import { z } from 'zod';

// ----------------------------------------------------------------------

export const postSchema = z.object({
  id: z.string(),
  content: z.string(),
  image: z.string().nullable(),
  isFeatured: z.boolean().optional(),
  commentCount: z.number().optional(),
  likedCount: z.number().optional(),
  type: z.enum(['text', 'media']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Post = z.infer<typeof postSchema>;
