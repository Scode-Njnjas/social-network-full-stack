import axiosInstance, { endpoints } from '@/utils/axios';

import { IApiResponse } from '@/interfaces/api-response';
import { ICommment } from '@/interfaces/comment';

//--------------------------------------------------------------------------------------------

export const getCommennts = async (id: string): Promise<IApiResponse<ICommment[]>> => {

    const response = await axiosInstance.get(`${endpoints.comment.get}/${id}/replies`);

    return response.data;
};

export const createComment = async (data: { id: string, content: string, parentId: string | null }): Promise<IApiResponse<string>> => {

    const response = await axiosInstance.post(`/v1/posts/${data.id}/comments`, data);

    return response.data;
}
