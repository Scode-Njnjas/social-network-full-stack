import { IAction } from '@/interfaces/notification';

//--------------------------------------------------------------------------------------------

export const getAction = (action: IAction): string => {
  switch (action) {
    case IAction.FOLLOWED:
      return 'followed you';
    case IAction.LIKED:
      return 'liked your post';
    case IAction.REPLIED:
      return 'replied on your post';
    default:
      return '';
  }
};
