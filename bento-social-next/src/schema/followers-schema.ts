import { z } from 'zod';

export const followersSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.date(),
});

export type Follower = z.infer<typeof followersSchema>;
