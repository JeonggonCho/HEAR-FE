import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {RequestErrorType, useErrorStore} from "@store/useErrorStore.ts";
import {useToastStore} from "@store/useToastStore.ts";

const axiosInstance:AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}`,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
    withXSRFToken: true,
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
        const {setError} = useErrorStore.getState();
        const {showToast} = useToastStore.getState();

        // 에러 발생 시, Toast 표시하기
        const errorData: RequestErrorType = {
            name: error.name || "네트워크 에러",
            message: (error as any).response.data.message || error.message || "네트워크 요청 실패",
            displayMode: "toast",
        };

        setError(errorData);
        showToast(errorData.message, "error");

        return Promise.reject(error);
    }
);

export default axiosInstance;