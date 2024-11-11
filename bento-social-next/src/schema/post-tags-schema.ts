import { z } from 'zod';

export const postTagsSchema = z.object({
  postId: z.string(),
  tagId: z.string(),
  createdAt: z.date(),
});

export type PostTag = z.infer<typeof postTagsSchema>;
