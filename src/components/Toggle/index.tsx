import {FC, useCallback, useState} from "react";

import {IToggleProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";
import useRequest from "@hooks/useRequest.ts";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

const Toggle:FC<IToggleProps> = ({url, status}) => {
    const [toggleValue, setToggleValue] = useState<boolean>(status);

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const handleToggle = useCallback(async () => {
        try {
            if (isLoading) return;
            await sendRequest({
                url: url,
                method: "patch",
                data: {status: !toggleValue},
            });
            setToggleValue((prevState) => !prevState);
        } catch (err) {
            console.error("토글 에러 발생: ", err);
        }

    }, [url, sendRequest, isLoading, toggleValue])

    return (
        <>
            <Container
                onClick={handleToggle}
                toggleValue={toggleValue}
                disabled={isLoading as boolean}
            >
                <div/>
            </Container>

            {errorText &&
                <Modal
                  content={<ErrorContent text={errorText} closeModal={clearError}/>}
                  setModal={clearError}
                  type={"popup"}
                />
            }
        </>
    );
};

export default Toggle;