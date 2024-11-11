import axiosInstance, { endpoints } from '@/utils/axios';

import { IApiResponse } from '@/interfaces/api-response';
import { INotification } from '@/interfaces/notification';

//--------------------------------------------------------------------------------------------

export const getNotifications = async (): Promise<
  IApiResponse<INotification[]>
> => {
  const { data } = await axiosInstance.get(endpoints.notification.get);
  return data;
};

export const readNotification = async (
  id: string
): Promise<IApiResponse<INotification[]>> => {
  const { data } = await axiosInstance.post(endpoints.notification.read(id));
  return data;
};

export const readAllNotifications = async (): Promise<
  IApiResponse<INotification[]>
> => {
  const { data } = await axiosInstance.post(endpoints.notification.readAll);
  return data;
};
