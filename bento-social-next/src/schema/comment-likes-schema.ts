import { z } from 'zod';

export const commentLikesSchema = z.object({
  commentId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export type CommentLike = z.infer<typeof commentLikesSchema>;
