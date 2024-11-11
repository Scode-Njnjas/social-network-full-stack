import { IApiResponse } from '@/interfaces/api-response';
import axiosInstance, { endpoints } from '@/utils/axios';

//-------------------------------------------------------------------------------------------

interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginParams): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.post(endpoints.auth.login, {
    username,
    password,
  });
  return response.data;
}

export const register = async (params: RegisterParams): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.post(endpoints.auth.register, params);
  return response.data;
};
