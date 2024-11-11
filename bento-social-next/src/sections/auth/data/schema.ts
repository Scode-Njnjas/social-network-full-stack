import { z } from 'zod';

// ----------------------------------------------------------------------

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(30, { message: 'Username must be 30 characters or less' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must be 30 characters or less' }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'FirstName must be at least 2 characters long' })
    .max(30, { message: 'FirstName must be 30 characters or less' }),
  lastName: z
    .string()
    .min(2, { message: 'LastName must be at least 2 characters long' })
    .max(30, { message: 'LastName must be 30 characters or less' }),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(30, { message: 'Username must be 30 characters or less' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must be 30 characters or less' }),
});

export type RegisterData = z.infer<typeof registerSchema>;
