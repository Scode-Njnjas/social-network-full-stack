'use client';

import React from 'react';

import { LeftButton, RightButton } from '@/components/icons';

import { cn } from '@/lib/utils';

//-----------------------------------------------------------------------------------------------

interface TagsBarProps {
  tagNames: string[];
  className?: string;
  onTagSelect: (tag: string) => void;
}

export default function FilterBar({
  tagNames,
  className,
  onTagSelect,
}: TagsBarProps) {
  const [activeTagIndex, setActiveTagIndex] = React.useState<number>(0);

  const handleTagClick = (index: number) => {
    setActiveTagIndex(index);
    onTagSelect(tagNames[index]);
  };

  return (
    <div
      className={cn(
        'relative flex space-x-2 items-center p-6 justify-center gap-3 w-full z-[2]',
        className
      )}
    >
      <div
        onClick={() =>
          setActiveTagIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : tagNames.length - 1
          )
        }
        className="absolute items-center justify-center left-0 bg-neutral3-50 rounded-full flex w-6 h-6 cursor-pointer"
      >
        <LeftButton />
      </div>

      <div className="absolute overflow-x-scroll no-scrollbar flex justify-start items-start gap-1 flex-nowrap w-full max-w-[calc(100%-70px)]">
        {tagNames.map((tag, index) => (
          <span
            key={tag}
            onClick={() => handleTagClick(index)}
            className={`tag-card text-[#f8f8f8b3] text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer hover:bg-hover ${
              activeTagIndex === index ? 'bg-[#f8f8f81a]' : ''
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        onClick={() =>
          setActiveTagIndex((prevIndex) =>
            prevIndex < tagNames.length - 1 ? prevIndex + 1 : 0
          )
        }
        className="absolute right-0 bg-neutral3-50 rounded-full flex justify-center items-center w-6 h-6 cursor-pointer"
      >
        <RightButton />
      </div>
    </div>
  );
}
