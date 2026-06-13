import axios from 'axios';

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AxiosInstance = axios.create({
  baseURL: BackendURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosInstance;
