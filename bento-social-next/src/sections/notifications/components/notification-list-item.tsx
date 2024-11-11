import { INotification, IAction } from '@/interfaces/notification';
import { Typography } from '@/components/typography';

import { CircleAvatar } from '../components/circle-avatar';
import { FollowedSVG, LikedSVG, Loader, RepliedSVG } from '@/components/icons';

import { getAction } from '../utils/get-Action';
import { getTimeAgo } from '../utils/get-time-ago';

//-----------------------------------------------------------------------------------------------

interface NItemProps {
  notification: INotification;
  onRead: () => void;
}

export const NotificationItem: React.FC<NItemProps> = ({
  notification,
  onRead,
}) => {
  const action = getAction(notification.action);
  const upperItem = generateActionIcon(notification.action);
  const timeAgo = getTimeAgo(notification.createdAt);

  return (
    <li
      onClick={onRead}
      className="cursor-pointer relative bg-neutral2-2 rounded-[20px] p-3 flex gap-2.5 items-center self-stretch"
    >
      <CircleAvatar
        path={notification.sender.avatar ?? '/img/default-avatar.jpg'}
        upperItem={upperItem}
        className=""
      />
      <div className="flex flex-1 flex-col gap-3">
        <span className="inline-flex flex-wrap gap-1">
          <Typography
            level="base2r"
            className="line-clamp-2 font-bold text-primary opacity-80"
          >
            {notification.sender.firstName} {notification.sender.lastName}
          </Typography>
          <Typography level="base2r" className="text-tertiary">
            {action}
          </Typography>
        </span>
        {notification.content && (
          <Typography level="base2r" className="text-primary">
            {notification.content}
          </Typography>
        )}
        <Typography level="base2r" className="text-tertiary">
          {timeAgo}
        </Typography>
      </div>
      {!notification.isRead && (
        <div className="absolute top-4 right-4 p-[5px] bg-[#29b383] rounded-full"></div>
      )}
    </li>
  );
};

const generateActionIcon = (action: IAction) => {
  switch (action) {
    case IAction.FOLLOWED:
      return (
        <div className="p-[5px] bg-[#8B33E2] rounded-full">
          <FollowedSVG />
        </div>
      );
    case IAction.LIKED:
      return (
        <div className="p-[5px] bg-wine rounded-full">
          <LikedSVG />
        </div>
      );
    case IAction.REPLIED:
      return (
        <div className="p-[5px] bg-[#127DFA] rounded-full">
          <RepliedSVG />
        </div>
      );
    default:
      return (
        <div className="p-[5px] bg-[#21B17E] rounded-full">
          <Loader />
        </div>
      );
  }
};
