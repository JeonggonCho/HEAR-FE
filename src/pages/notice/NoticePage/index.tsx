import {FC, useCallback, useEffect, useState} from "react";

import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import NoticeListItem from "@components/board/NoticeListItem";
import LoadingLoop from "@components/common/LoadingLoop";
import Tab from "@components/common/Tab";
import Header from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Toast from "@components/common/Toast";

import {useUserDataStore} from "@store/useUserStore.ts";
import useRequest from "@hooks/useRequest.ts";
import {INotice} from "@/types/componentProps.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {navCategories} from "@constants/navCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {Container, HeaderWrapper, NoticeListItemWrapper} from "./style.ts";

import notice from "@assets/images/notice.png";
import {ITab} from "@/types/tab.ts";

const NoticePage:FC = () => {
    const [notices, setNotices] = useState<INotice[]>([]);

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

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

    return (
        <Container>
            <HeadTag title={buttonCategories.notice[lang]}/>

            <Header leftChild={
                <HeaderWrapper>
                    <img src={notice} alt="피드백"/>
                    <h2>{navCategories.board[lang]}</h2>
                </HeaderWrapper>
            } type={"flex"}/>

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
                            />
                        ))
                        :
                        <Empty title={messageCategories.emptyNotice[lang]}/>
                    }

                    {userData?.role === "manager" &&
                      <FloatingButton to={"/board/notice/new"}/>
                    }
                </NoticeListItemWrapper>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default NoticePage;