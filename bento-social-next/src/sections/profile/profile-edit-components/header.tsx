import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { ArrowBackIcon, CameraIcon, TrashIcon } from '@/components/icons';
import { Typography } from '@/components/typography';

//-------------------------------------------------------------------------

interface HeaderEditProps {
  onSave: () => void;
  onClickCamera?: () => void;
}

export default function HeaderEdit({ onSave, onClickCamera }: HeaderEditProps) {
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center gap-2 p-3 z-10">
      <Button
        onClick={() => router.back()}
        className="size-[44px]"
        child={<ArrowBackIcon />}
      />
      <Button className="size-[44px] ml-auto" child={<TrashIcon />} />
      <Button
        className="size-[44px]"
        child={<CameraIcon />}
        onClick={onClickCamera}
      />
      <Button
        className="py-3 px-6"
        onClick={onSave}
        child={
          <Typography level="base2sm" className="text-secondary">
            Save
          </Typography>
        }
      />
    </div>
  );
}
