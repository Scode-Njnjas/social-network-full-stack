import { z } from 'zod';

const storiesStatus = z.enum(['active', 'inactive']);

export const storiesSchema = z.object({
  id: z.string(),
  userId: z.string(),
  content: z.string().nullable(),
  likeCount: z.number().default(0),
  viewCount: z.number().default(0),
  media: z.any().nullable(),
  expiresAt: z.date(),
  status: storiesStatus,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Story = z.infer<typeof storiesSchema>;
