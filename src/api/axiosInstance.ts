import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

const axiosInstance:AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}`,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const token = JSON.parse(authStorage)["state"]["accessToken"];
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response:AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;