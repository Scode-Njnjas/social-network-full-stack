'use client';

import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

import { createComment } from '@/apis/comment';
import { createPost } from '@/apis/post';
import { getTopics } from '@/apis/topic';
import { usePost } from '@/context/post-context';
import { useUserProfile } from '@/context/user-context';
import { IPost } from '@/interfaces/post';
import { ITopic } from '@/interfaces/topic';
import { CreatePost, createPostSchema } from '@/schema/posts-schema';

import { Avatar } from '@/components/avatar';
import { UploadImgButton } from '@/components/new-post/post-control';
import { Typography } from '@/components/typography';

import { cn } from '@/lib';

import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { CloseIcon } from '../icons';
import { SplashScreen } from '../loading-screen';

//----------------------------------------------------------------------------------

interface PostContentProps {
  usedBy: 'post' | 'reply';
  className?: string;
  onCreated?: (isCreate: boolean) => void;
  postId?: string;
  parentComment?: { id: string; fullname: string };
}

export default function ComposerInput({
  usedBy,
  className,
  onCreated,
  postId,
  parentComment,
}: PostContentProps) {
  const { userProfile } = useUserProfile();
  const { addPost } = usePost();
  const [isInputFocused, setInputFocused] = React.useState<boolean>(false);

  const [selectedTopic, setSelectedTopic] = React.useState<string>('');
  const [topics, setTopics] = React.useState<ITopic[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [uploadedImage, setUploadedImage] = React.useState<string>('');
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const [content, setContent] = React.useState<string>('');
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  React.useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response.data);
        setSelectedTopic(response.data[0].id);
      })
      .catch((error) => {
        console.error('Error fetching topics:', error);
        setError('Failed load topics.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const postData: CreatePost = {
        content: content.trim(),
        image: uploadedImage || null,
        topicId: selectedTopic,
      };

      const validatedData = createPostSchema.parse(postData);

      const tempId = Math.random().toString(36).substring(2, 15);

      const newPost: IPost = {
        id: tempId,
        content: content.trim(),
        image: uploadedImage,
        topic: topics.find((topic) => topic.id === selectedTopic) || {
          id: '',
          name: '',
          color: '',
          postCount: 0,
          createdAt: '',
          updatedAt: '',
        },
        author: {
          id: userProfile?.id || '',
          username: userProfile?.username || '',
          firstName: userProfile?.firstName || '',
          lastName: userProfile?.lastName || '',
          avatar: userProfile?.avatar || null,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFeatured: false,
        commentCount: 0,
        likedCount: 0,
        type: uploadedImage === 'post' ? 'media' : 'text',
        hasLiked: false,
        hasSaved: false,
      };

      if (usedBy !== 'post') {
        setContent('');
        setInputFocused(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        const commentData = {
          id: postId as string,
          parentId: parentComment?.id ?? null,
          content: validatedData.content,
        };

        await createComment(
          parentComment?.id ? commentData : { ...commentData, parentId: null }
        );
        onCreated?.(true);
        return;
      }

      addPost(newPost);

      await createPost(validatedData);

      setContent('');
      setPreviewUrl('');
      setUploadedImage('');
      setInputFocused(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(', ');
        console.log(`Validation error: ${errorMessage}`);
      } else {
        console.log('Failed to create post. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setUploadedImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  React.useEffect(() => {
    if (parentComment?.fullname) {
      setContent(`@${parentComment.fullname} `);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
      }
    }
  }, [parentComment]);

  if (loading) return <SplashScreen />;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={cn(
        `w-full flex gap-3 h-[64px] z-10 overflow-hidden items-center justify-between p-3 absolute left-0 bottom-0 rounded-[1.25rem] ${isInputFocused ? ' h-fit flex-col justify-start bg-neutral3-70 hover:bg-neutral2-5' : 'flex-row bg-neutral2-2'} transition-all duration-[0.2s]`,
        className
      )}
    >
      <div
        className={`w-full flex justify-between items-start gap-3 grow ${isInputFocused ? 'items-start' : 'items-center'}`}
      >
        <Avatar
          className="rounded-full"
          alt="avatar"
          size={40}
          src={userProfile?.avatar}
        />

        <div className="flex-1">
          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              usedBy === 'post' ? 'Start a post...' : 'Post your reply...'
            }
            className={`min-w-full p-0 text-left min-h-fit max-h-fit !bg-transparent text-tertiary placeholder:text-tertiary grow opacity-50 focus:outline-none focus:bg-transparent focus:opacity-100 ${isInputFocused ? 'pt-[0px]' : ' pt-[30px]'}`}
            onFocus={() => setInputFocused(true)}
          />
          {previewUrl && (
            <div className="relative mt-2 rounded-lg overflow-hidden group">
              <div className="relative bg-neutral2-1 p-2 rounded-lg">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={600}
                  height={300}
                  style={{ objectFit: 'contain' }}
                  className="w-full h-auto max-h-[18rem] rounded"
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity opacity-0 group-hover:opacity-100"
                  disabled={isUploading}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`${isInputFocused ? 'w-full' : 'hidden'} flex items-center mt-3`}
      >
        {isInputFocused && usedBy === 'post' ? (
          <div id="tool-reply" className="flex gap-1 items-center mt-3">
            {/* <EmojiButton /> */}

            <UploadImgButton
              fileInputRef={fileInputRef}
              setPreviewUrl={setPreviewUrl}
              setUploadedImage={setUploadedImage}
              setIsUploading={setIsUploading}
            />

            {/* <GifButton /> */}

            <Dropdown
              options={topics.map((topic) => ({
                label: topic.name,
                value: topic.id,
                color: topic.color,
              }))}
              value={selectedTopic}
              onChange={setSelectedTopic}
              placeholder="Select an topic"
            />
          </div>
        ) : (
          ''
        )}

        <Button
          disabled={!content.trim() || isUploading || isSubmitting}
          className="px-[1.5rem] py-[0.75rem] ml-auto"
          onClick={handleSubmit}
          child={
            <Typography className="text-secondary" level="base2sm">
              {isSubmitting
                ? 'Posting...'
                : usedBy === 'post'
                  ? 'Post'
                  : 'Reply'}
            </Typography>
          }
        />
      </div>
    </div>
  );
}
