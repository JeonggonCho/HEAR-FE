import {useCallback, useState} from "react";
import useRequest from "@hooks/useRequest.ts";


const useToggle = (initialStatus: boolean, url: string) => {
    const [status, setStatus] = useState<boolean>(initialStatus);

    const {sendRequest} = useRequest();

    const handleToggle = useCallback(() => {
        setStatus(prevState => {
            const newState = !prevState;

            sendRequest({
                url: url,
                method: "patch",
                data: {status: newState},
            }).catch(err => {
                console.error("토글 에러 발생: ", err);
                setStatus(currentState => (currentState === newState ? prevState : currentState));
            });

            return newState;
        });
    }, [url, sendRequest])

    return {status, handleToggle};
};

export default useToggle;