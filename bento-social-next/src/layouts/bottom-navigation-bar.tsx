import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Badge } from '@/components/badge';

import { NAVIGATION_ITEMS, NavigationItem } from './navigation-items';

//-----------------------------------------------------------------------------------------------

export default function BottomNavigationBar() {
  const navItems = NAVIGATION_ITEMS.filter(
    (item) => item.title !== 'My Profile'
  );

  return (
    <div className="fixed z-10 bottom-4 w-full md:hidden ">
      <section className="w-fit mx-auto relative p-[1px] bg-surface rounded-[20px] before:content-[''] before:absolute before:inset-0 before:opacity-25 before:bg-linear-card before:z-9 before:rounded-[20px] after:content-[''] after:absolute after:inset-[1px] after:z-9 after:[1px] after:bg-[#313131] after:rounded-[19px] after:backdrop-blur-50 after:shadow-card">
        <nav className="rounded-[19px] relative z-10 p-[9px] gap-4 bg-surface flex justify-center items-center h-fit w-fit">
          {navItems.map((item, index) => (
            <BottomNavItem key={index} navItem={item} />
          ))}
        </nav>
      </section>
    </div>
  );
}

type BottomNavItemProps = {
  navItem: NavigationItem;
};

const BottomNavItem = ({ navItem }: BottomNavItemProps) => {
  const { update, path, Icon } = navItem;
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <button
      onClick={() => router.push(path)}
      className={` relative z-0  flex items-center justify-center rounded-xl ${isActive && `active p-[1px] bg-neutral2-10 rounded-xl before:absolute before:inset-0 before:opacity-15 before:bg-linear-card before:rounded-xl after:content-[''] after:absolute after:inset-[1px] after:bg-[#313131] after:rounded-[11px] `}`}
    >
      <div
        className={`group-[.active]:bg-neutral2-10 group-[.active]:p-[5px] flex items-center  p-1.5 rounded-[11px] relative z-1 backdrop-blur-16`}
      >
        <span className={`relative inline-flex p-1 `}>
          {update && (
            <span className="absolute z-20 -top-[4px] -right-[4px]">
              {update.count > 1 ? <Badge content={update.count} /> : <Badge />}
            </span>
          )}
          {Icon}
        </span>
      </div>
    </button>
  );
};
