'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { getTopics } from '@/apis/topic';
import { getPosts } from '@/apis/post';

import { IPost } from '@/interfaces/post';
import { ITopic } from '@/interfaces/topic';

import { SplashScreen } from '@/components/loading-screen';
import { Button } from '@/components/button';
import { ArrowBackIcon } from '@/components/icons';
import SearchInput from '@/components/search-input/search-input';
import { EmptyContent } from '@/components/empty-content';
import { Typography } from '@/components/typography';

import FilterBar from '../filter-bar';
import ExploreCard from '../explore-card';

//-----------------------------------------------------------------------------------------------

export default function ExploreView() {
  const router = useRouter();
  const [searchStr, setSearchStr] = React.useState<string>('');
  const [topics, setTopics] = React.useState<string[]>([]);
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = React.useState<IPost[]>(posts);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await getPosts({ str: searchStr, type: 'media' });
        setPosts(response.data);
        setFilteredPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(new Error('Failed to fetch posts'));
      }
    })();
  }, [searchStr]);

  React.useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getTopics();

        const topicNames = response.data.map((topic: ITopic) => topic.name);
        setTopics(['All', ...topicNames]);
      } catch (error) {
        console.error('Error fetching topics:', error);
      } finally {
      }
    };

    fetchTopics();
  }, []);

  const handleTagSelect = (tag: string) => {
    if (tag === 'All') {
      setFilteredPosts(posts);
    } else {
      const topicFilteredPosts = posts.filter(
        (post) => post.topic.name === tag
      );
      setFilteredPosts(topicFilteredPosts);
    }
  };

  return (
    <section className="w-full min-h-screen max-h-fit flex flex-col p-3 gap-3 bg-surface">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => router.back()}
          className="size-[44px]"
          child={<ArrowBackIcon />}
        />
        <SearchInput
          placeholder="Search posts..."
          search={searchStr}
          setSearch={setSearchStr}
        />
      </div>
      <FilterBar tagNames={topics} onTagSelect={handleTagSelect} />
      {isLoading ? (
        <SplashScreen />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : filteredPosts.length === 0 || posts.length === 0 ? (
        <EmptyContent
          content={
            <Typography level="base2sm" className="text-secondary">
              No post
            </Typography>
          }
        />
      ) : (
        <div
          style={{ alignItems: 'start' }}
          className="w-full max-h-fit pb-[5rem] overflow-y-scroll flex flex-col gap-2 md:pb-0 md:grid md:grid-cols-2 2xl:grid-cols-2 no-scrollbar scroll-smooth"
        >
          {filteredPosts.map((post: IPost) => (
            <ExploreCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
