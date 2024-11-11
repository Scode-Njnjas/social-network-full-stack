import React from 'react';

import { getNotifications } from '@/apis/notification';

//--------------------------------------------------------------------------------------------

export default function useUnreadNoti() {
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        const notifications = response.data;
        const count = notifications.filter((noti) => !noti.isRead).length;
        setUnreadCount(count);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return unreadCount;
}
