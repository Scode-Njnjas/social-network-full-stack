import axiosInstance from '@/utils/axios';
import { endpoints } from '@/utils/axios';

import { Media } from '@/interfaces/media';
import { IApiResponse } from '@/interfaces/api-response';

//--------------------------------------------------------------------------------------------

export const uploadImage = async (file: File): Promise<IApiResponse<Media>> => {
  const form = new FormData();
  form.append('file', file);

  const response = await axiosInstance.post(endpoints.media.upload, form);

  return response.data;
};
