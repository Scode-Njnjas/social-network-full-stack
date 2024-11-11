import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { USER_AVATAR_PLACEHOLDER } from '@/constant';

//-------------------------------------------------------------------------

interface AvatarProps {
  size?: number;
  src?: string;
  alt: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size, className }) => (
  <div className="relative">
    <Image
      width={size ? size : 44}
      height={size ? size : 44}
      src={src ? src : USER_AVATAR_PLACEHOLDER}
      alt={alt}
      style={{
        minHeight: size ? size : 44,
        maxHeight: size ? size : 44,
        minWidth: size ? size : 44,
      }}
      loading="lazy"
      className={cn('rounded-full object-cover bg-neutral-100', className)}
    />
  </div>
);

export default Avatar;
