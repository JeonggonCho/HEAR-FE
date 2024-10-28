import {FC, useCallback, useEffect, useState} from "react";

import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";

import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container, EmptyNotice, ImgWrapper, More, Notice, NoticesWrapper} from "./style.ts";

import notice from "@assets/images/notice.png";


const NoticeCard:FC = () => {
    const [latestNotices, setLatestNotices] = useState<{noticeId: string, title: string}[]>([]);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const fetchLatestNotices = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/notices/latest"
            });
            if (response.data) {
                setLatestNotices(response.data);
            }
        } catch (err) {
            console.error("최신 공지사항 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setLatestNotices]);

    useEffect(() => {
        fetchLatestNotices();
    }, [fetchLatestNotices]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) {
            showToast(errorText, "error");
            const errorTimer = setTimeout(clearError, 6000);
            return () => clearTimeout(errorTimer);
        }
    }, [errorText, clearError, showToast]);

    // 로딩중인 경우, 스켈레톤 렌더링
    if (isLoading) {
        return <CardLoading heightValue={"55px"}/>
    }

    return (
        <Container>
            <ImgWrapper valid={latestNotices.length > 0}>
                <img src={notice} alt="notice"/>
            </ImgWrapper>

            {latestNotices.length > 0 ?
                <>
                    <NoticesWrapper>
                        {latestNotices.map(value => {
                            return (
                                <Notice key={value.noticeId} to={`/board/notice/${value.noticeId}`}>
                                    <span>{value.title}</span>
                                </Notice>
                            );
                        })}
                    </NoticesWrapper>
                    <More to={"/board/notice"}>
                        {buttonCategories.more[lang]} <ArrowForward/>
                    </More>
                </>
                :
                <EmptyNotice>{messageCategories.emptyNotice[lang]}</EmptyNotice>
            }
        </Container>
    );
};

export default NoticeCard;