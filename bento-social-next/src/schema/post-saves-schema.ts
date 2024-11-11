import { z } from 'zod';

export const postSavesSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export type PostSave = z.infer<typeof postSavesSchema>;
