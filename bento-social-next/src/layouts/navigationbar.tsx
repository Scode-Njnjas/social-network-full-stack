import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';

import { Badge } from '@/components/badge';
import Right from '@/components/icons/right';
import { Typography } from '@/components/typography';

import { cn } from '@/lib/utils';

import { NavigationItem } from './navigation-items';

//-----------------------------------------------------------------------------------------------

type NavigationBarProps = HTMLAttributes<HTMLDivElement> & {
  expanded?: boolean;
  navigationItems: NavigationItem[];
};

export default function NavigationBar({
  navigationItems,
  className,
  expanded,
  ...props
}: NavigationBarProps) {
  const pathname = usePathname();
  return (
    <nav
      {...props}
      className={cn(`flex flex-col items-center gap-1`, className)}
    >
      {navigationItems.map(({ Icon, title, path, update }, index) => {
        const isActive = pathname === path;
        const activeStyle = `active p-[1px] hover:bg-neutral2-15 active:bg-neutral4-30 rounded-xl before:absolute before:inset-0 before:opacity-25 before:bg-linear-card before:rounded-xl after:content-[''] after:absolute after:inset-[1px] after:bg-[#313131]  after:rounded-[11px]`;
        return (
          <Link
            key={index}
            href={path}
            prefetch
            className={`group relative z-0 rounded-xl hover:bg-neutral1-5 active:bg-neutral4-30 ${expanded ? 'w-full' : 'w-fit'} ${
              isActive && activeStyle
            }`}
          >
            <div
              className={`group/sub group-[.active]:bg-neutral2-10 group-[.active]:hover:bg-neutral2-15 group-[.active]:active:bg-neutral4-30 group-[.active]:p-[5px] hover:bg-neutral1-5 active:neutral4-30 flex items-center gap-3 p-1.5 rounded-[11px] backdrop-blur-16 relative z-1 ${expanded ? '' : 'w-fit'}`}
            >
              <span className="relative inline-flex p-1">
                {update && (
                  <span className="absolute z-20 -top-[4px] -right-[4px]">
                    {update.count !== 1 ? (
                      <Badge content={update.count} />
                    ) : (
                      <Badge />
                    )}
                  </span>
                )}
                {Icon}
              </span>
              {expanded && (
                <>
                  <Typography
                    level="base2sm"
                    className="text-tertiary select-none opacity-80 group-[.active]:text-primary group-[.active]:font-semibold group-hover:text-secondary"
                  >
                    {title}
                  </Typography>
                  <span className="absolute right-0 p-1 hidden group-hover/sub:block group-[.active]:group-hover/sub:hidden ">
                    <Right />
                  </span>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
