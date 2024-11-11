import { ICommment } from './comment';
import { ITopic } from './topic';
export interface Comment {
  id: number;
  user?: {
    name: string;
    avatar: string;
  };
  content?: {
    text: string;
    image?: string;
  };
  interactions?: {
    likes: number;
    reposts: number;
    comments: number;
  };
}

export interface IAuthor {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface IPost {
  id: string;
  content: string;
  image: string;
  isFeatured: boolean;
  commentCount: number;
  likedCount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  topic: ITopic;
  author: IAuthor;
  hasLiked: boolean;
  hasSaved: boolean;
  comments?: ICommment[];
}
