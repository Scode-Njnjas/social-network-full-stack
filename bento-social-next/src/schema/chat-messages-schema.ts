import { z } from 'zod';

export const chatMessagesSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  senderId: z.string(),
  content: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ChatMessage = z.infer<typeof chatMessagesSchema>;
