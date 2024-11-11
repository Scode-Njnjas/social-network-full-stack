'use client';
import React from 'react';
import { SearchIcon } from '../icons';
import { DebouncedInput } from '../input';
import { cn } from '@/lib/utils';

type SearchInputProps = {
  placeholder: string;
  className?: string;
  search?: string;
  setSearch?: (searchStr: string) => void;
};

const SearchInput = ({
  placeholder,
  className,
  setSearch,
  search,
}: SearchInputProps) => {
  return (
    <form
      className={cn(
        `grow p-2.5 rounded-full backdrop-blur-16 bg-neutral3-70 flex items-center gap-3`,
        className
      )}
    >
      <button type="submit" className="rounded-full">
        <SearchIcon />
      </button>
      <DebouncedInput
        type="text"
        value={search ?? ''}
        onChange={(value: string) => setSearch && setSearch(value)}
        placeholder={placeholder}
        className="flex-1"
      ></DebouncedInput>
    </form>
  );
};

export default SearchInput;
