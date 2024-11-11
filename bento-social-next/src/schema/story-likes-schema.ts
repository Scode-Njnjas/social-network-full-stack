import { z } from 'zod';

export const storyLikesSchema = z.object({
  storyId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export type StoryLike = z.infer<typeof storyLikesSchema>;
