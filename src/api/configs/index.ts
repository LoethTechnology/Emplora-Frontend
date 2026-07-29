import { useAuthStore } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store';
import axios from 'axios';

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AxiosInstance = axios.create({
  baseURL: BackendURL,
});

AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    const token = useAuthStore.getState().token;
    const statusCode = error?.response?.status;

    if (statusCode === 401) {
      console.log('reached');
      console.log('token', token);
      if (token) {
        useAuthStore.getState().clearAuth();
        useUserStore.getState().clearUser();
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
