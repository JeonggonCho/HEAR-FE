import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "@components/common/Card";
import Flex from "@components/common/Flex";
import Button from "@components/common/Button";
import CardLoading from "@components/skeleton/CardLoading";
import useRequest from "@hooks/useRequest.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {
    AssistantLabWrapper, AssistantNameWrapper, CardTitleWrapper,
    EmptyAssistantInfo, ImageWrapper,
} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import assistant from "@assets/images/assistant.png";


const AssistantCard = () => {
    const [assistantInfo, setAssistantInfo] = useState<{username: string, lab: string}>();

    const navigate = useNavigate();

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();

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

    if (isLoading) {
        return <CardLoading heightValue={"120px"}/>;
    }

    return (
        <Card padding={18} borderRadius={16}>
            <Flex direction={"column"} gap={16}>
                <Flex align={"center"} gap={12}>
                    <ImageWrapper src={assistant} valid={!!assistantInfo} alt="관리 조교"/>
                    <CardTitleWrapper valid={!!assistantInfo}>{cardCategories.assistant[lang]}</CardTitleWrapper>
                </Flex>

                {assistantInfo ?
                    <Flex align={"flex-end"} justify={"space-between"}>
                        <Flex align={"center"} gap={8} style={{marginBottom: "4px"}}>
                            <AssistantNameWrapper>{assistantInfo.username}</AssistantNameWrapper>
                            <AssistantLabWrapper>{assistantInfo.lab}</AssistantLabWrapper>
                        </Flex>

                        {userData?.role !== "assistant" &&
                          <Button
                            type={"button"}
                            variant={"filled"}
                            width={"fit"}
                            color={"third"}
                            size={"sm"}
                            onClick={() => navigate("/board/inquiry/new")}
                          >
                              {buttonCategories.inquiry[lang]}
                          </Button>
                        }
                    </Flex>
                    :
                    <EmptyAssistantInfo>
                        {messageCategories.emptyAssistantInfo[lang]}
                    </EmptyAssistantInfo>
                }
            </Flex>
        </Card>
    );
};

export default AssistantCard;