import { z } from 'zod';

const commentsStatus = z.enum([
  'pending',
  'approved',
  'rejected',
  'deleted',
  'spam',
]);

export const commentsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  postId: z.string(),
  parentId: z.string().nullable(),
  content: z.string(),
  likedCount: z.number().default(0),
  replyCount: z.number().default(0),
  status: commentsStatus,
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type Comment = z.infer<typeof commentsSchema>;
