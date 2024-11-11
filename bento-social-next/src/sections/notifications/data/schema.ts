import { z } from 'zod';

const notificationsAction = z.enum(['liked', 'followed', 'replied']);

export const notificationsSchema = z.object({
  id: z.string(),
  receiverId: z.string(),
  content: z.string().nullable(),
  action: notificationsAction,
  isSent: z.boolean().nullable(),
  isRead: z.boolean().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Notification = z.infer<typeof notificationsSchema>;