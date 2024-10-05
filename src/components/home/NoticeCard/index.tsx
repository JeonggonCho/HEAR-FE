import {FC, useCallback, useEffect, useState} from "react";

import ArrowForward from "@components/common/ArrowForward";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {buttonLabels} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, EmptyNotice, ImgWrapper, More, Notice, NoticesWrapper} from "./style.ts";

import notice from "@assets/images/notice.png";

const NoticeCard:FC = () => {
    const [latestNotices, setLatestNotices] = useState<{noticeId: string, title: string}[]>([]);

    const {lang} = useThemeStore();

    const {sendRequest, errorText, clearError} = useRequest();

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

    return (
        <Container>
            <ImgWrapper valid={latestNotices.length > 0}>
                <img src={notice} alt="공지사항"/>
            </ImgWrapper>

            {latestNotices.length > 0 ?
                <>
                    <NoticesWrapper>
                        {latestNotices.map(value => {
                            return (
                                <Notice key={value.noticeId} to={`/communication/notice/${value.noticeId}`}>
                                    <span>{value.title}</span>
                                </Notice>
                            );
                        })}
                    </NoticesWrapper>
                    <More to={"/communication/notice"}>
                        {buttonLabels.more[lang]} <ArrowForward/>
                    </More>
                </>
                :
                <EmptyNotice>공지사항이 없습니다</EmptyNotice>
            }

            {errorText &&
              <Modal
                content={<ErrorContent text={errorText} closeModal={clearError}/>}
                setModal={clearError}
                type={"popup"}
                />
            }
        </Container>
    );
};

export default NoticeCard;