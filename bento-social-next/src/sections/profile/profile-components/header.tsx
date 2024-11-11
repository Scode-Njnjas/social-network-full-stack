import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { ArrowBackIcon } from '@/components/icons';

//-------------------------------------------------------------------------

export default function ProfileHead() {
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center gap-2 p-3 z-10">
      <Button
        onClick={() => router.back()}
        className="size-[44px]"
        child={<ArrowBackIcon />}
      />
    </div>
  );
}
