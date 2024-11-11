import { Typography } from '@/components/typography';
import { cn } from '@/lib/utils';
//--------------------------------------------------------------------------------------------------------

interface ReactItemProps {
  value: number;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ReactItem({
  value,
  icon,
  className,
  onClick,
}: ReactItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 h-[2.5rem] py-[0.75rem] rounded-[1.25rem] transition-all duration-[0.2] group hover:bg-neutral2-5',
        className
      )}
    >
      {icon}
      <Typography
        level="captionsm"
        className="opacity-80 text-secondary group-hover:text-primary"
      >
        {value}
      </Typography>
    </div>
  );
}
