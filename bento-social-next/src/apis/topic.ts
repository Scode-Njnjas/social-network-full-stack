import axiosInstance, { endpoints } from '@/utils/axios';

import { IApiResponse } from '@/interfaces/api-response';
import { ITopic } from '@/interfaces/topic';

//--------------------------------------------------------------------------------------------

export const getTopics = async (): Promise<IApiResponse<ITopic[]>> => {
  
  const response = await axiosInstance.get(
    endpoints.topic.get,
  );
  
  return response.data;
};
