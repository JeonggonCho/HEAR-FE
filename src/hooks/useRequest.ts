import {useState} from "react";
import axiosInstance from "@api/axiosInstance.ts";

interface IRequestProps {
    url: string;
    method: "get" | "post" | "put" | "patch" | "delete";
    data?: any;
    header?: any;
}

const useRequest = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | null>(null);

    const sendRequest = async ({url, method = "get", data = null, header = {}}: IRequestProps) => {
        setIsLoading(true);
        try {
            let response;
            switch (method) {
                case "get":
                    response = await axiosInstance.get(url, header);
                    break;
                case "post":
                    response = await axiosInstance.post(url, data, header);
                    break;
                case "put":
                    response = await axiosInstance.put(url, data, header);
                    break;
                case "patch":
                    response = await axiosInstance.patch(url, data, header);
                    break;
                case "delete":
                    response = await axiosInstance.delete(url, header);
                    break;
                default:
                    setIsLoading(false);
                    throw new Error("지원하지 않는 메서드입니다.");
            }

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`HTTP 오류 발생: ${response.status}`);
            }

            setIsLoading(false);
            return response;
        } catch (err: any) {
            setErrorText(err.message);
            setIsLoading(false);
            throw err;
        }
    };

    const clearError = () => {
        setErrorText(null);
    };

    return {isLoading, errorText, sendRequest, clearError}
};

export default useRequest;