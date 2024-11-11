'use client';
import ProtectedRoute from '@/components/protected-router';
import { PostProvider } from '@/context/post-context';
import { ProfileProvider } from '@/context/user-context';
import useBreakPoint from '@/hooks/use-breakpoint';
import BottomNavigationBar from '@/layouts/bottom-navigation-bar';
import Main from '@/layouts/main';
import Sidebar from '@/layouts/sidebar';
import eventBus from '@/utils/event-emitter';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { breakpoint } = useBreakPoint();

  const [isPostShow, setIsPostShow] = React.useState(false);

  React.useEffect(() => {
    const handleToggle = (status: boolean) => {
      setIsPostShow(status);
    };

    eventBus.on('isShowCreatePost', handleToggle);

    return () => {
      eventBus.off('isShowCreatePost', handleToggle);
    };
  }, []);

  const isSmallScreen = breakpoint === 'sm';
  return (
    <ProtectedRoute>
      <ProfileProvider>
        <PostProvider>
          <div className="h-fit block bg-cushion md:flex relative 3xl:w-[1600px] mx-auto w-full after:absolute after:inset-0 after:z-99  after:shadow-wrapper after:pointer-events-none">
            {isSmallScreen || <Sidebar className="bg-surface-3" />}
            <Main>{children}</Main>
            {isSmallScreen && !isPostShow && <BottomNavigationBar />}
          </div>
        </PostProvider>
      </ProfileProvider>
    </ProtectedRoute>
  );
}
