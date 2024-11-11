import { z } from 'zod';

const usersRole = z.enum(['user', 'admin']);
const usersStatus = z.enum([
  'active',
  'pending',
  'inactive',
  'banned',
  'deleted',
]);

export const usersSchema = z.object({
  id: z.string(),
  cover: z.string().nullable(),
  avatar: z.string().nullable(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  salt: z.string(),
  role: usersRole,
  bio: z.string().nullable(),
  websiteUrl: z.string().nullable(),
  followerCount: z.number().optional(),
  postCount: z.number().optional(),
  status: usersStatus.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof usersSchema>;
