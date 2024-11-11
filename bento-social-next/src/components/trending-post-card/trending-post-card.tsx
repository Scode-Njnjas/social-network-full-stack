import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '@/components/typography';

import { cn } from '@/lib/utils';

import { IAuthor } from '@/interfaces/post';
import { ITopic } from '@/interfaces/topic';
import { relativeTime } from '@/utils/relative-time';

import { Avatar } from '../avatar';

//--------------------------------------------------------------------------------------------------------

interface TrendingPostCardProps {
  className?: string;
  content: string;
  image: string;
  alt: string;
  time: string;
  author: IAuthor;
  topic: ITopic;
}

export default function TrendingPostCard({
  className,
  content,
  image,
  alt,
  author,
  topic,
  time,
}: TrendingPostCardProps) {
  return (
    <Link href={`/posts/${alt}`}>
      <div
        className={cn(
          'relative bg-neutral2-2 rounded-[1.25rem] p-3 flex items-center gap-4 hover:bg-neutral2-5 focus:border-[3px] focus:border-neutral2-10',
          className
        )}
      >
        <Image
          src={image}
          alt={alt}
          width={100}
          height={100}
          style={{
            minWidth: '7rem',
            maxHeight: '6rem',
            minHeight: '6rem',
            objectFit: 'cover',
          }}
          className="rounded-[0.5rem] row-span-2 items-center"
        />
        <div className="flex flex-col gap-3">
          <Typography
            level="base2sm"
            className="text-primary opacity-80 line-clamp-2"
          >
            {content}
          </Typography>
          {author && (
            <div className="flex items-center justify-start gap-3">
              <div
                id="avatar-user"
                className="flex w-fit justify-start items-start"
              >
                <Avatar
                  src={author?.avatar ?? author.avatar ?? ''}
                  alt={author.username}
                  size={20}
                  className="max-h-[20px]"
                />
              </div>
              <Typography level="captionr" className="opacity-45 text-tertiary">
                {relativeTime(new Date(time))}
              </Typography>
              <div
                className="p-1 rounded-full"
                style={{
                  backgroundColor: `${topic.color ? topic.color : '#ffffff'}`,
                }}
              ></div>
              <Typography level="captionr" className="text-tertiary">
                {topic.name}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
