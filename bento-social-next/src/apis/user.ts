/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from '@/interfaces/api-response';
import { IUserProfile } from '@/interfaces/user';
import {
  default as axios,
  default as axiosInstance,
  endpoints,
} from '@/utils/axios';

// ----------------------------------------------------------------------

interface IGetUserListParams {
  url: string;
  params: Record<string, any>;
}

export const getUserList = async <T>({
  url,
  params,
}: IGetUserListParams): Promise<T> => {
  const { data } = await axios.get<T>(url, {
    params,
  });

  return data;
};

export const getUserProfile = async (): Promise<IApiResponse<IUserProfile>> => {
  const { data } = await axiosInstance.get(endpoints.user.profile);

  return data;
};

export const updateUserProfile = async (
  profileData: Partial<IUserProfile> & { password?: string }
): Promise<IApiResponse<IUserProfile>> => {
  const { data } = await axiosInstance.patch(
    endpoints.user.profile,
    profileData
  );
  return data;
};

export const getUserProfileById = async (
  userId: string
): Promise<IApiResponse<IUserProfile>> => {
  const { data } = await axiosInstance.get(endpoints.user.profileById(userId));

  return data;
};

export const getUserBookmarks = async (
  userId: string
): Promise<IApiResponse<any[]>> => {
  const { data } = await axiosInstance.get(endpoints.user.bookmark(userId));
  return data;
};

export const getUserFollower = async (
  id: string
): Promise<IApiResponse<any>> => {
  const { data } = await axiosInstance.get(endpoints.user.followers(id));
  return data;
};

export const getUserFollowing = async (
  id: string
): Promise<IApiResponse<any>> => {
  const { data } = await axiosInstance.get(endpoints.user.followings(id));
  return data;
};

export const followUser = async (id: string): Promise<IApiResponse<any>> => {
  const { data } = await axiosInstance.post(endpoints.user.follow(id));
  return data;
};

export const unfollowUser = async (id: string): Promise<IApiResponse<any>> => {
  const { data } = await axiosInstance.delete(endpoints.user.unfollow(id));
  return data;
};

export const hasFollowed = async (id: string): Promise<boolean> => {
  try {
    const { data } = await axiosInstance.get(endpoints.user.hasFollowed(id));
    return data.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
