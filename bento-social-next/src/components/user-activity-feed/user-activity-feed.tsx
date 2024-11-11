import Image from 'next/image';

import { IPost } from '@/interfaces/post';

import { EmptyContent } from '../empty-content';
import { Post } from '../post';
import { Typography } from '../typography';
import Link from 'next/link';

//-----------------------------------------------------------------------------------------------

interface NewFeedProps {
  contentType: 'post' | 'media';
  data: IPost[];
  loading?: boolean;
  err?: string | null;
  className?: string;
  onDeleted?: (isDeleted: boolean) => void;
}

export default function ActivityFeed({
  contentType,
  data,
  loading,
  err,
  onDeleted,
}: NewFeedProps) {
  const posts = (
    <ul className="w-full h-full mt-3">
      {data.map((post) => (
        <li key={post.id} className="mb-2">
          <Post data={post} onDeleteSuccess={onDeleted} />
        </li>
      ))}
    </ul>
  );

  const media = (
    <div className="w-full h-fit grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
      {data.map((media, index) => (
        <Link key={`${media.image}-${index}`} href={`/posts/${media.id}`}>
          <Image
            src={media.image}
            width={633}
            height={400}
            alt={'media'}
            className="w-full h-[12rem] rounded-[1.5rem] object-cover"
          />
        </Link>
      ))}
    </div>
  );

  return (
    <div className="">
      {loading ? (
        <div>Loading posts...</div>
      ) : err ? (
        <div className="text-white">Error loading posts: {err}</div>
      ) : data.length === 0 ? (
        <EmptyContent
          content={
            <Typography level="base2sm" className="text-tertiary">
              This user hasn&apos;t posted anything yet
            </Typography>
          }
        />
      ) : contentType === 'post' ? (
        posts
      ) : (
        media
      )}
    </div>
  );
}
