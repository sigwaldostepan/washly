import { clientEnv } from '@/config';
import axios from 'axios';
import { toast } from 'sonner';

const apiClient = axios.create({
  baseURL: `${clientEnv.NEXT_PUBLIC_DOMAIN_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data.message;
      toast.error('Waduh ada kesalahan nih', {
        description: message,
      });
      return Promise.reject(error.response.data);
    } else if (error.request) {
      toast.error('Tidak dapat terhubung ke server');
      return Promise.reject({ error: 'Tidak dapat terhubung ke server' });
    } else {
      toast.error('Terjadi kesalahan');
      return Promise.reject({ error: 'Terjadi kesalahan' });
    }
  },
);

const adminApiClient = axios.create({
  baseURL: `${clientEnv.NEXT_PUBLIC_DOMAIN_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

adminApiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data.message;
      toast.error('Waduh ada kesalahan nih', {
        description: message,
      });
      return Promise.reject(error.response.data);
    } else if (error.request) {
      toast.error('Tidak dapat terhubung ke server');
      return Promise.reject({ error: 'Tidak dapat terhubung ke server' });
    } else {
      toast.error('Terjadi kesalahan');
      return Promise.reject({ error: 'Terjadi kesalahan' });
    }
  },
);

export { apiClient, adminApiClient };

export type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type ApiError = {
  error: string;
  message?: string;
};
