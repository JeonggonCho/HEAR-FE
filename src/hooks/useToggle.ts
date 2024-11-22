import {useCallback, useState} from "react";
import useRequest from "@hooks/useRequest.ts";


const useToggle = (initialStatus: boolean, url: string) => {
    const [status, setStatus] = useState<boolean>(initialStatus);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const handleToggle = useCallback(async () => {
        try {
            if (isLoading) return;
            await sendRequest({
                url: url,
                method: "patch",
                data: {status: !status},
            });
            setStatus((prevState) => !prevState);
        } catch (err) {
            console.error("토글 에러 발생: ", err);
        }
    }, [url, sendRequest, isLoading, status])

    return {status, handleToggle, isLoading, errorText, clearError};
};

export default useToggle;