import {useCallback, useState} from "react";
import axiosInstance from "@api/axiosInstance.ts";


export interface IRequestProps {
    url: string;
    method?: "get" | "post" | "put" | "patch" | "delete";
    data?: any;
    header?: any;
}


const MIN_LOADING_TIME = 1000;


const useRequest = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendRequest = useCallback(
        async ({url, method = "get", data = null, header = {}}: IRequestProps) => {
            setIsLoading(true);
            const startTime = Date.now();

            try {
                let response;
                const config = {headers: header};

                switch (method) {
                    case "get":
                        response = await axiosInstance.get(url, config);
                        break;
                    case "post":
                        response = await axiosInstance.post(url, data, config);
                        break;
                    case "put":
                        response = await axiosInstance.put(url, data, config);
                        break;
                    case "patch":
                        response = await axiosInstance.patch(url, data, config);
                        break;
                    case "delete":
                        response = await axiosInstance.delete(url, config);
                        break;
                    default:
                        setIsLoading(false);
                        throw new Error("지원하지 않는 메서드입니다.");
                }

                const elapsedTime = Date.now() - startTime;
                setTimeout(() => {
                    setIsLoading(false);
                }, Math.max(0, MIN_LOADING_TIME - elapsedTime));

                if (response.status < 200 || response.status >= 300) {
                    throw new Error(`HTTP 오류 발생: ${response.status}`);
                }

                return response;
            } catch (error: any) {
                setIsLoading(false);
                throw error;
            }
        }, []);

    return {isLoading, sendRequest}
};

export default useRequest;