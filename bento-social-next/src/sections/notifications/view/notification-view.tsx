'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import useBreakpoint from '@/hooks/use-breakpoint';

import {
  getNotifications,
  readAllNotifications,
  readNotification,
} from '@/apis/notification';
import { IAction, INotification } from '@/interfaces/notification';

import { AppBar } from '@/components/appbar';
import { Button } from '@/components/button';
import { ArrowBackIcon } from '@/components/icons';
import { SplashScreen } from '@/components/loading-screen';
import Tabbar from '@/components/tabbar/tabbar';
import { Typography } from '@/components/typography';

import { NotificationList } from '../components/notification-list';

//-----------------------------------------------------------------------------------------------

const TABITEMS = [
  { key: 'all', label: 'All' },
  { key: 'likes', label: 'Likes' },
  { key: 'replies', label: 'Replies' },
  { key: 'follows', label: 'Follows' },
];

export default function NotificationsView() {
  const { breakpoint } = useBreakpoint();
  const [activeTab, setActiveTab] = useState(() => TABITEMS[0].key);
  const [notification, setNotification] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const data = await getNotifications();
        setNotification(data.data.reverse());
      } catch (error) {
        console.error('Failed to load notifications:', error);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleReadAll = async () => {
    try {
      await readAllNotifications();
      setNotification((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  };

  const handleReadSingle = async (id: string) => {
    try {
      await readNotification(id);
      setNotification((prevNotifications) =>
        prevNotifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const isSmallScreen = breakpoint === 'sm';
  const filteredNotification = useMemo(() => {
    switch (activeTab) {
      case 'all':
        return notification;
      case 'likes':
        return notification.filter((n) => n.action === IAction.LIKED);
      case 'replies':
        return notification.filter((n) => n.action === IAction.REPLIED);
      case 'follows':
        return notification.filter((n) => n.action === IAction.FOLLOWED);
      default:
        return notification;
    }
  }, [activeTab, notification]);

  const tabs = useMemo(() => {
    return isSmallScreen
      ? TABITEMS.filter((tab) => tab.key !== 'replies')
      : TABITEMS;
  }, [isSmallScreen]);

  const handleChangeTab = (tab: string) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  if (loading) return <SplashScreen />;

  if (error) return <p>{error}</p>;

  return (
    <section
      className={`relative min-h-screen max-h-fit flex-1 flex flex-col gap-3 p-3 no-scrollbar pb-[6rem] md:pb-0`}
    >
      <AppBar
        leading={
          <Button
            className="group p-2.5"
            onClick={() => router.back()}
            child={
              <ArrowBackIcon className="h-6 w-6 stroke-secondary group-hover:stroke-primary group-active:stroke-primary group-[.disabled]:stroke-tertiary" />
            }
          />
        }
        title={'Notifications'}
        trailing={
          <Typography
            onClick={handleReadAll}
            level="subheadline"
            className="p-2.5 text-base text-neutral-200 cursor-pointer"
          >
            Read all
          </Typography>
        }
      />
      <Tabbar tabs={tabs} activeTab={activeTab} onTabChange={handleChangeTab} />
      <NotificationList
        notifications={filteredNotification}
        onReadSingle={handleReadSingle}
      />
    </section>
  );
}
