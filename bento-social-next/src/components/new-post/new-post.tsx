import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

import { createPost } from '@/apis/post';
import { getTopics } from '@/apis/topic';
import { usePost } from '@/context/post-context';
import { useUserProfile } from '@/context/user-context';
import { IPost } from '@/interfaces/post';
import { ITopic } from '@/interfaces/topic';
import { CreatePost, createPostSchema } from '@/schema/posts-schema';

import { Avatar } from '@/components/avatar';
import { ArrowBackIcon } from '@/components/icons';
import { CloseIcon } from '@/components/icons';
import { UploadImgButton } from '@/components/new-post/post-control';
import { Typography } from '@/components/typography';

import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { DebouncedInput } from '../input';
import { SplashScreen } from '../loading-screen';

//----------------------------------------------------------------------------------

interface INewPostProps {
  onBack?: () => void;
}

export default function NewPost({ onBack }: INewPostProps) {
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [uploadedImage, setUploadedImage] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const { userProfile } = useUserProfile();
  const { addPost } = usePost();

  const [selectedTopic, setSelectedTopic] = React.useState<string>('');
  const [topics, setTopics] = React.useState<ITopic[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  console.log("🚀 ~ file: new-post.tsx:43 ~ NewPost ~ error:", error)

  const [content, setContent] = React.useState<string>('');
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

      addPost(newPost);

      await createPost(validatedData);

      setContent('');
      setPreviewUrl('');
      setUploadedImage('');
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

      if (onBack) onBack();
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setUploadedImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[#444444] z-20 md:bg-[#12121299] shadow-stack">
      <div className="hidden md:block absolute top-2 right-2 z-20">
        <Button
          className="size-[40px] p-2.5"
          child={<CloseIcon />}
          onClick={onBack}
        />
      </div>
      <div className="w-full h-full relative shadow-button bg-[#282828b3] backdrop-blur-[50px] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] md:mx-auto md:w-[40rem] md:h-[16rem] md:mt-[10%] md:rounded-button md:before:rounded-button ">
        <div className="md:hidden w-full flex items-center justify-between p-3">
          <Button
            className="size-10 p-2.5"
            child={<ArrowBackIcon />}
            onClick={onBack}
          />
          <Button
            className="px-[1.5rem] py-[0.75rem] rounded-[2rem] text-secondary"
            child={<Typography level="base2sm">Post</Typography>}
          />
        </div>

        <div className="w-full max-h-screen mx-auto flex flex-col justify-between items-center md:h-full md:items-start md:justify-between md:static md:rounded-[2rem]">
          <div className="w-full p-3 rounded-[1.25rem]">
            <div className="flex items-start gap-3">
              <Avatar
                size={44}
                className="max-h-[44px]"
                alt="avatar"
                src={userProfile?.avatar}
              />
              <div className="flex-1">
                <DebouncedInput
                  type="text"
                  placeholder="Start a post..."
                  value={content}
                  onChange={(value: string) => setContent(value)}
                />
                {previewUrl && (
                  <div className="relative mt-2 rounded-lg overflow-hidden group">
                    <div className="relative bg-neutral2-1 p-2 rounded-lg">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                        width={300}
                        height={200}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="fixed bottom-4 w-fit mx-auto rounded-[1.25rem] p-2 flex gap-2 items-center bg-neutral2-3 z-20 md:p-3 md:w-full md:bg-transparent md:relative md:mx-0 md:justify-between md:bottom-0">
            {/* <EmojiButton /> */}

            <UploadImgButton
              fileInputRef={fileInputRef}
              setPreviewUrl={setPreviewUrl}
              setUploadedImage={setUploadedImage}
              setIsUploading={setIsUploading}
            />

            {/* <GifButton /> */}
            {/* <TagButton /> */}

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

            <Button
              disabled={!content.trim() || isUploading || isSubmitting}
              type="submit"
              className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] text-secondary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              child={<Typography level="base2sm">Post</Typography>}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
