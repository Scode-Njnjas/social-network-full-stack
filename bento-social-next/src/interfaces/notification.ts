export enum IAction {
  LIKED = 'liked',
  FOLLOWED = 'followed',
  REPLIED = 'replied',
}

interface ISender {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface INotification {
  id: string;
  receiverId: string;
  actorId: string;
  content: string;
  action: IAction;
  isSent: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  sender: ISender;
}
