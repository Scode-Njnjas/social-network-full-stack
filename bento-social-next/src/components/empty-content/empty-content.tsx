import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

//-----------------------------------------------------------------------------------------------

interface Props {
  content: React.ReactNode;
  image?: string;
  className?: string;
}

export default function EmptyContent({ content, image, className }: Props) {
  return (
    <div
      className={cn(
        `max-h-full flex flex-col justify-center items-center text-center mb-[50px]`,
        className
      )}
    >
      <Image
        width={500}
        height={500}
        alt="empty"
        src={image ? image : '/svg/list-empty.svg'}
        style={{
          objectFit: 'contain',
          objectPosition: 'left top',
        }}
        className="mx-auto"
      />
      {content}
    </div>
  );
}
