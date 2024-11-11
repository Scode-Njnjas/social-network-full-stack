import { IImage } from './image';
import { IPost } from './post';

//-----------------------------------------------------------------------------
export interface IUserSimple {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string | null;
}

export interface IUserProfile {
  id: string;
  cover?: string;
  avatar?: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  bio?: string;
  websiteUrl?: string;
  followerCount: number;
  postCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  posts?: IPost[];
  media?: IImage[];
}
