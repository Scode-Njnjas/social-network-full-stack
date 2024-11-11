import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { Typography } from '@/components/typography';
import { Avatar } from '@/components/avatar';

import { IPost } from '@/interfaces/post';

//---------------------------------------------------------------------------------------

interface IExploreCardProps {
  post: IPost;
}

export default function ExploreCard({ post }: IExploreCardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group w-full min-w-[17.5rem] flex flex-col rounded-[20px] p-3 bg-neutral2-2 gap-3 md:items-start md:justify-center md:hover:bg-hover"
    >
      <Image
        src={post.image}
        alt={
          'Image post by user ' +
          post.author.username +
          ' with topic ' +
          post.topic?.name
        }
        height={500}
        width={900}
        style={{
          objectFit: 'cover',
          minHeight: '212px',
          maxHeight: '212px',
          width: '100%',
        }}
        className="rounded-xl gap-2 justify-start items-center object-cover"
      />
      <div className="trending-content grow flex flex-col gap-2 mx-2 md:justify-start md:items-start opacity-80">
        <Typography level="captionr" className="text-secondary line-clamp-2">
          {post.content}
        </Typography>
      </div>

      <div className="flex w-full items-center gap-3 px-3">
        <Avatar
          src={post.author.avatar ?? '/img/default-avatar.jpg'}
          alt={post.author.username}
          size={32}
        />

        <Typography level="small" className="text-tertiary mr-auto">
          {post.author.firstName} {post.author.lastName}
        </Typography>

        {/* <Typography level="small" className="text-tertiary mr-auto">
          {relativeTime(new Date(post.createdAt))}
        </Typography> */}

        <Typography
          level="smallsm"
          className={`text-tertiary inline-flex items-center gap-2 before:size-2 before:rounded-full before:inset-0 before:bg-[var(--color)]`}
          style={{ '--color': post.topic?.color } as React.CSSProperties}
        >
          {post.topic?.name}
        </Typography>
      </div>
    </Link>
  );
}
