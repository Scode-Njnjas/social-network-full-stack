import {
  BookIcon,
  ExploreIcon,
  MessageIcon,
  NotificationIcon,
} from '@/components/icons';
import HomeIcon from '@/components/icons/home';
import Profile from '@/components/icons/profile';

//-----------------------------------------------------------------------------------------------

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: 'Home',
    Icon: <HomeIcon />,
    path: '/',
  },
  {
    title: 'Notifications',
    update: { status: true, count: 1 },
    Icon: <NotificationIcon />,
    path: '/notifications',
  },
  {
    title: 'Messages',
    Icon: <MessageIcon />,
    path: '/messages',
  },
  {
    title: 'Bookmarks',
    Icon: <BookIcon />,
    path: '/bookmark',
  },
  {
    title: 'My Profile',
    Icon: <Profile />,
    path: '/profile',
  },
  {
    title: 'Explore',
    Icon: <ExploreIcon />,
    path: '/explore',
  },
];

export type NavigationItem = {
  update?: { status: boolean; count: number };
  title: string;
  Icon: JSX.Element;
  path: string;
};
