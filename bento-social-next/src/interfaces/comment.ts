import { IUserSimple } from './user';

export interface ICommment {
  id: string;
  userId: string;
  postId: string;
  parentId: string | null;
  content: string;
  likedCount: number;
  replyCount?: number;
  createdAt: string;
  updatedAt: string;
  author: IUserSimple;
  user: IUserSimple;
  children: IChilrenComment[];
}


export interface IChilrenComment {
  id: string;
  userId: string;
  postId: string;
  parentId: string | null;
  content: string;
  likedCount: number;
  createdAt: string;
  updatedAt: string;
  author: IUserSimple;
  user: IUserSimple;
}