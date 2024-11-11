import { z } from 'zod';

export const storyViewsSchema = z.object({
  storyId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export type StoryView = z.infer<typeof storyViewsSchema>;
