import { z } from 'zod';

export const topicsSchema = z.object({
  id: z.string(),
  name: z.string(),
  postCount: z.number().optional(),
  color: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Topic = z.infer<typeof topicsSchema>;
