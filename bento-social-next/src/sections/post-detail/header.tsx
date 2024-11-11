'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { ArrowBackIcon, ExplandIcon } from '@/components/icons';

//----------------------------------------------------------------------
interface HeaderProps {
  onViewFullPost: () => void;
}

export default function Header({ onViewFullPost }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="mb-3 flex justify-between items-center w-ful">
      <Button
        onClick={() => router.back()}
        child={<ArrowBackIcon />}
        disabled={false}
        className="cursor-pointer md:bg-button rounded-full p-[0.625rem]"
      />

      <Button
        child={<ExplandIcon />}
        disabled={false}
        className="hidden lg:inline-flex cursor-pointer md:bg-button rounded-full p-[0.625rem]"
        onClick={onViewFullPost}
      />
    </div>
  );
}
