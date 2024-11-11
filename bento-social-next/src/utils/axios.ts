'use client';

import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';

import { HOST_API } from '../global-config';

//----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        const router = useRouter();
        router.push('/login');
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

const VERSION_PREFIX = '/v1';

export const endpoints = {
  auth: {
    login: `${VERSION_PREFIX}/authenticate`,
    register: `${VERSION_PREFIX}/register`,
  },

  user: {
    get: `${VERSION_PREFIX}/users`,
    create: `${VERSION_PREFIX}/users`,
    update: `${VERSION_PREFIX}/profile`,
    profile: `${VERSION_PREFIX}/profile`,
    bookmark: (id: string) => `${VERSION_PREFIX}/users/${id}/saved-posts`,
    followers: (id: string) => `${VERSION_PREFIX}/users/${id}/followers`,
    followings: (id: string) => `${VERSION_PREFIX}/users/${id}/followings`,
    follow: (id: string) => `${VERSION_PREFIX}/users/${id}/follow`,
    unfollow: (id: string) => `${VERSION_PREFIX}/users/${id}/unfollow`,
    profileById: (id: string) => `${VERSION_PREFIX}/users/${id}`,
    hasFollowed: (id: string) => `${VERSION_PREFIX}/users/${id}/has-followed`,
  },

  post: {
    get: `${VERSION_PREFIX}/posts`,
    create: `${VERSION_PREFIX}/posts`,
    update: (id: string) => `${VERSION_PREFIX}/posts/${id}`,
    delete: (id: string) => `${VERSION_PREFIX}/posts/${id}`,
    detail: `${VERSION_PREFIX}/posts/:id`,
    like: (id: string) => `${VERSION_PREFIX}/posts/${id}/like`,
    unlike: (id: string) => `${VERSION_PREFIX}/posts/${id}/unlike`,
    save: (id: string) => `${VERSION_PREFIX}/posts/${id}/save`,
    unsave: (id: string) => `${VERSION_PREFIX}/posts/${id}/unsave`,
  },
  media: {
    upload: `${VERSION_PREFIX}/upload-file`,
  },

  topic: {
    get: `${VERSION_PREFIX}/topics`,
    detail: `${VERSION_PREFIX}/topics/:id`,
    create: `${VERSION_PREFIX}/topics`,
  },

  notification: {
    get: `${VERSION_PREFIX}/notifications`,
    read: (id: string) => `${VERSION_PREFIX}/notifications/${id}/read`,
    readAll: `${VERSION_PREFIX}/notifications/read-all`,
  },

  comment: {
    get: `${VERSION_PREFIX}/comments`,
  },
};
