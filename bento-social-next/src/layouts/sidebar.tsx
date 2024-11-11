import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

import useBreakPoint from '@/hooks/use-breakpoint';

import { useAuth } from '@/context/auth-context';
import { paths } from '@/routes/paths';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import {
  AddIcon,
  ChevronRight,
  ExpandControl,
  Leave,
  Logo,
  MoreIcon,
  SettingSlider,
} from '@/components/icons';
import { NewPostModal } from '@/components/new-post';
import { Typography } from '@/components/typography';

import { useUserProfile } from '@/context/user-context';
import useUnreadNoti from '@/hooks/use-unread-noti';

import { NAVIGATION_ITEMS } from './navigation-items';
import NavigationBar from './navigationbar';

import { USER_AVATAR_PLACEHOLDER } from '@/constant/contants';
import { cn } from '@/lib/utils';

//-----------------------------------------------------------------------------------------------

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { breakpoint } = useBreakPoint();
  const unreadCount = useUnreadNoti();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isCreatePost, setIsCreatePost] = React.useState(false);

  const navItems = NAVIGATION_ITEMS.map((item) =>
    item.title === 'Notifications'
      ? { ...item, update: { status: true, count: unreadCount } }
      : item
  );

  const { userProfile: user } = useUserProfile();

  const currentUser = user && {
    fullname: `${user.firstName} ${user.lastName}`,
    nickname: user.username,
    avatar: user.avatar || USER_AVATAR_PLACEHOLDER,
    isActive: user.status === 'active',
  };

  React.useEffect(() => {
    setIsExpanded(
      !(breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg')
    );
  }, [breakpoint]);

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCreatePost) {
        setIsCreatePost(false);
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isCreatePost]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreatePost = () => {
    setIsCreatePost(!isCreatePost);
  };

  return (
    <aside
      className={cn(
        `group/sidebar flex flex-col h-screen bg-surface-3 transition-[width] duration-300 ease-in-out ${
          isExpanded ? 'w-70 2xl:w-80' : 'w-18'
        }`,
        className
      )}
    >
      <section className="w-full flex justify-between items-center p-3">
        <div className=" h-[44px] w-fit relative flex items-center">
          <Logo
            className={`mx-auto transition-all transform ${
              isExpanded
                ? 'opacity-100 translate-x-0'
                : 'group-hover/sidebar:-translate-x-5 group-hover/sidebar:opacity-0'
            }`}
          />
          {!isExpanded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                className={`group p-2.5 transition-all  transform group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100  ${
                  isExpanded ? 'opacity-0' : 'translate-x-5 opacity-0'
                }`}
                onClick={toggleSidebar}
                child={
                  <ChevronRight className="h-6 w-6 stroke-secondary group-hover:stroke-primary group-active:stroke-primary group-[.disabled]:stroke-tertiary" />
                }
              />
            </div>
          )}
        </div>
        {isExpanded && (
          <Button
            className={'p-2.5'}
            onClick={toggleSidebar}
            child={
              <ExpandControl className="h-6 w-6 fill-secondary group-hover:fill-primary group-active:fill-primary group-[.disabled]:fill-tertiary" />
            }
          />
        )}
      </section>

      <section id="navigation" className="p-3 flex-1">
        <NavigationBar
          expanded={isExpanded}
          navigationItems={navItems}
          className="flex-1"
        />
      </section>
      <section className="p-3 flex flex-col gap-2 items-center justify-center">
        {currentUser && (
          <UserSection isExpanded={isExpanded} user={currentUser} />
        )}
        <Button
          className={`${isExpanded ? 'px-6 py-3 w-full' : 'size-[44px]'}`}
          onClick={() => {
            handleCreatePost();
          }}
          child={
            isExpanded ? (
              <Typography
                level="base2sm"
                className="text-secondary select-none "
              >
                Post
              </Typography>
            ) : (
              <AddIcon />
            )
          }
        />
      </section>
      <p className="text-tertiary text-[10px] text-center mb-2">
        Code by{' '}
        <Link target="_blank" href="https://github.com/Scode-Njnjas">
          @<span className="text-[#278e4f]">Scode Njnjas</span>
        </Link>
      </p>

      {isCreatePost && <NewPostModal onBack={handleCreatePost} />}
    </aside>
  );
}

interface User {
  fullname: string;
  nickname: string;
  avatar: string;
  isActive: boolean;
}

interface UserSectionProps {
  isExpanded: boolean;
  user: User;
}

export function UserSection({ isExpanded, user }: UserSectionProps) {
  const [isMoreOptions, setIsMoreOptions] = React.useState(false);
  const auth = useAuth();
  const router = useRouter();

  const toggleMoreOptions = () => {
    setIsMoreOptions(!isMoreOptions);
  };

  const handleLogout = () => {
    auth.setToken(null);
  };

  return (
    <>
      <div
        onClick={toggleMoreOptions}
        className={`relative z-20 flex p-1.5 gap-3 w-full items-center justify-center backdrop-blur-16  hover:bg-neutral1-5 active:bg-neutral4-30 ${isExpanded ? 'rounded-xl' : 'rounded-full '}`}
      >
        <Avatar src={user.avatar} alt={user.nickname} size={32} />

        {isExpanded && (
          <div className="flex flex-1 items-center">
            <span className="flex-grow">
              <Typography
                level="base2sm"
                className="text-secondary opacity-80 select-none"
              >
                {user.fullname}
              </Typography>
              <br />
              <Typography
                level="captionr"
                className="text-tertiary opacity-45 select-none"
              >
                @{user.nickname}
              </Typography>
            </span>
            <span className="p-1">
              <MoreIcon />
            </span>
          </div>
        )}
        {isMoreOptions && (
          <>
            <div className="absolute -top-[96px] right-0 z-50 mr-0.5 bg-neutral2-5 rounded-[32px] shadow-dropup border border-neutral1-20">
              <button
                onClick={() =>
                  router.push(`${paths.settings}?view=account-settings`)
                }
                className="h-12 z-50 flex p-2 items-center rounded-t-[32px] bg-neutral1-0 hover:bg-neutral1-5 backdrop-blur-16"
              >
                <SettingSlider />
              </button>
              <button
                onClick={handleLogout}
                className="h-12 z-50 flex p-2 items-center rounded-b-[32px] bg-neutral1-0 hover:bg-neutral1-5 backdrop-blur-16"
              >
                <Leave />
              </button>
            </div>
          </>
        )}
      </div>
      {isMoreOptions && (
        <div className="fixed inset-0 z-10" onClick={toggleMoreOptions}></div>
      )}
    </>
  );
}
