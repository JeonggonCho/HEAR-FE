import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

const axiosInstance:AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}`,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response:AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;