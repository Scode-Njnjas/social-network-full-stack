import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { ArrowBackIcon } from '@/components/icons';
import { Typography } from '@/components/typography';

//-------------------------------------------------------------------------

export default function HeaderFollowers() {
  const router = useRouter();
  return (
    <section className="mt-[3rem] md:mt-0 mb-3 flex gap-5 items-center">
      <Button
        child={<ArrowBackIcon />}
        disabled={false}
        onClick={() => router.back()}
        className="size-[44px]"
      />
      <Typography level="title" className="text-secondary">
        200Lab
      </Typography>
    </section>
  );
}
