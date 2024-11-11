import { z } from 'zod';

export const postLikesSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export type PostLike = z.infer<typeof postLikesSchema>;
