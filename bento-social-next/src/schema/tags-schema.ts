import { z } from 'zod';

export const tagsSchema = z.object({
  id: z.string(),
  name: z.string(),
  postCount: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Tag = z.infer<typeof tagsSchema>;
