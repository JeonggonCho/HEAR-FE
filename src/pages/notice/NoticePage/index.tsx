import {useCallback, useEffect, useState} from "react";

import {Header} from "@components/common/Header";
import Tab from "@components/common/Tab";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import NoticeListItem from "@components/board/NoticeListItem";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {INotice} from "@/types/componentProps.ts";
import {ITab} from "@/types/tab.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {navCategories} from "@constants/navCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container, NoticeListItemWrapper} from "./style.ts";
import {LogoAndTitleWrapper} from "@components/common/Header/style.ts";

import notice from "@assets/images/notice.png";
import write from "@assets/icons/write.svg";


const NoticePage = () => {
    const [notices, setNotices] = useState<INotice[]>([]);

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const tabs: ITab[] = [
        { name: buttonCategories.notice[lang], path: "/board/notice", },
        { name: buttonCategories.inquiry[lang], path: "/board/inquiry", },
        { name: buttonCategories.feedback[lang], path: "/board/feedback", },
    ];

    const fetchNotices = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/notices",
            });
            setNotices(response.data);
        } catch (err) {
            console.error("공지 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchNotices();
    }, [fetchNotices]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return (
        <Container>
            <HeadTag title={buttonCategories.notice[lang]}/>

            <Header>
                <Header.Left>
                    <LogoAndTitleWrapper>
                        <img src={notice} alt="피드백"/>
                        <h2>{navCategories.board[lang]}</h2>
                    </LogoAndTitleWrapper>
                </Header.Left>
            </Header>

            <Tab type={"line"} tabs={tabs}/>

            {isLoading ?
                <LoadingLoop/>
                :
                <NoticeListItemWrapper>
                    {notices.length !== 0 ? notices.map((value, idx) => (
                            <NoticeListItem
                                key={idx}
                                title={value.title}
                                _id={value._id}
                                createdAt={value.createdAt}
                                views={value.views}
                                comments={value.comments}
                            />
                        ))
                        :
                        <Empty title={messageCategories.emptyNotice[lang]}/>
                    }

                    {userData?.role === "assistant" &&
                      <FloatingButton
                        type={"link"}
                        to={"/board/notice/new"}
                        icon={write}
                      />
                    }
                </NoticeListItemWrapper>
            }
        </Container>
    );
};

export default NoticePage;