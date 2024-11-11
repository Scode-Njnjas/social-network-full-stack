import { NotificationItem } from './notification-list-item';
import { INotification } from '@/interfaces/notification';

interface NotificationListProps {
  notifications: INotification[];
  onReadSingle: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onReadSingle,
}) => {
  return (
    <ul className="no-scrollbar overflow-scroll flex-grow gap-2 flex flex-col relative">
      {notifications.map((noti) => (
        <NotificationItem
          key={noti.id}
          notification={noti}
          onRead={() => onReadSingle(noti.id)}
        />
      ))}
    </ul>
  );
};
