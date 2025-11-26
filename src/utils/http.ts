import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import { useStoreIndex } from '@/store/index';

const http: AxiosInstance = axios.create({
  timeout: 20000,
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : import.meta.env.VITE_HOME_URL
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const store = useStoreIndex();
    const token = Cookies.get("token");
    if (config.url === "/api/user/login" || config.url === "/api/user/token") {
      return config;
    }
    if (token && config.headers) {
      config.headers.Authentication = `Bearer ${token}`;
      config.headers.token = token;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default http;

