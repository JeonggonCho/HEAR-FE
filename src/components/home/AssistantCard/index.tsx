import {FC, useCallback, useEffect, useState} from "react";

import Button from "@components/common/Button";
import CardLoading from "@components/skeleton/CardLoading";

import useRequest from "@hooks/useRequest.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {
    AssistantCardTitleWrapper, AssistantInfoWrapper,
    Container, EmptyAssistantInfo,
} from "./style.ts";

import assistant from "@assets/images/assistant.png";


const AssistantCard:FC = () => {
    const [assistantInfo, setAssistantInfo] = useState<{username: string, lab: string}>();

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const fetchAssistantInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users/assistant",
            });
            if (response.data) {
                setAssistantInfo(response.data);
            }
        } catch (err) {
            console.error("조교 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchAssistantInfo();
    }, [fetchAssistantInfo]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    if (isLoading) {
        return <CardLoading heightValue={"120px"}/>;
    }

    return (
        <Container>
            <AssistantCardTitleWrapper valid={!!assistantInfo}>
                <img src={assistant} alt="관리 조교"/>
                <h3>{cardCategories.assistant[lang]}</h3>
            </AssistantCardTitleWrapper>

            {assistantInfo ?
                <AssistantInfoWrapper>
                    <div>
                        <span>{assistantInfo.username}</span>
                        <span>{assistantInfo.lab}</span>
                    </div>

                    {userData?.role !== "assistant" &&
                      <Button
                        type={"link"} to={"/board/inquiry/new"}
                        content={buttonCategories.inquiry[lang]}
                        width={"fit"}
                        color={"third"}
                        scale={"small"}
                      />
                    }
                </AssistantInfoWrapper>
                :
                <EmptyAssistantInfo>
                    {messageCategories.emptyAssistantInfo[lang]}
                </EmptyAssistantInfo>
            }
        </Container>
    );
};

export default AssistantCard;