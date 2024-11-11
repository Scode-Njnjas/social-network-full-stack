import { Typography } from '@/components/typography';

//--------------------------------------------------------------------------------------------------------

interface MoreItemProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function MoreItem({ title, icon, onClick }: MoreItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-neutral2-10 rounded-[1rem] group">
      <Typography
        level="base2sm"
        className="text-tertiary group-hover:text-primary"
      >
        {title}
      </Typography>
      {icon}
    </button>
  );
}
