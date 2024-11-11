import React from 'react';
import { useRouter } from 'next/router';

import { Button } from '@/components/button';
import { ArrowBackIcon } from '@/components/icons';
import SearchInput from '@/components/search-input/search-input';

//-----------------------------------------------------------------------------------------------

export default function HeaderExplore() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={() => router.back()}
        className="size-[44px]"
        child={<ArrowBackIcon />}
      />
      <SearchInput placeholder={'Search topics...'} />
    </div>
  );
}
