'use client';
import { getPosts } from '@/apis/post';
import { IPost } from '@/interfaces/post';
import React from 'react';

//--------------------------------------------------------------------------------------------
interface PostContextType {
  posts: IPost[];
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  addPost: (newPost: IPost) => void;
  updatePostCtx: (updatedPost: IPost) => void;
  setPosts: (posts: IPost[]) => void;
  isLoading: boolean;
  error: Error | null;
  refreshPosts: () => Promise<void>;
}

interface FilterType {
  str?: string;
  limit?: number;
  userId?: string;
  type?: string;
}

const PostContext = React.createContext<PostContextType | undefined>(undefined);

function usePostsManager(initialFilter: FilterType) {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [filter, setFilter] = React.useState<FilterType>(initialFilter);

  const fetchPosts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPosts(filter);
      console.log("🚀 ~ file: post-context.tsx:38 ~ fetchPosts ~ response:", response)
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(new Error('Failed to fetch posts'));
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPost = (newPost: IPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const updatePostCtx = (updatedPost: IPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return {
    posts,
    filter,
    setFilter,
    addPost,
    updatePostCtx,
    setPosts,
    isLoading,
    error,
    refreshPosts: fetchPosts,
  };
}

export function PostProvider({ children }: { children: React.ReactNode }) {
  const postManager = usePostsManager({});

  return (
    <PostContext.Provider value={postManager}>{children}</PostContext.Provider>
  );
}

export function usePost() {
  const context = React.useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}
