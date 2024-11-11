import Image from 'next/image';
import { ReactNode } from 'react';

import { cn } from '@/lib';

//-----------------------------------------------------------------------------------------------

interface CircleAvatarProps {
  upperItem?: ReactNode;
  path: string;
  className?: string;
}

export const CircleAvatar: React.FC<CircleAvatarProps> = ({
  path,
  upperItem,
  className,
}) => {
  return (
    <div className={cn('relative h-11 w-11', className)}>
      <Image
        width={44}
        height={44}
        src={path}
        alt="thumbnail"
        className="h-full w-full rounded-full object-cover bg-neutral-100"
      />
      {upperItem && (
        <div className="absolute -bottom-1 -right-1 rounded-full p-0.5 bg-[#313131]">
          {upperItem}
        </div>
      )}
    </div>
  );
};
