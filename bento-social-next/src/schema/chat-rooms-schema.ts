import { z } from 'zod';

const chatRoomsType = z.enum(['direct', 'group']);
const chatRoomsStatus = z.enum(['pending', 'active', 'deleted']);

export const chatRoomsSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  receiverId: z.string(),
  type: chatRoomsType.optional(),
  status: chatRoomsStatus.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type ChatRoom = z.infer<typeof chatRoomsSchema>;
