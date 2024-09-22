import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";
import Dropdown from "@components/Dropdown";

import useRequest from "@hooks/useRequest.ts";
import {INotice} from "@/types/componentProps.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {useUserDataStore} from "@store/useUserStore.ts";

import {Container, NoticeInfoWrapper} from "./style.ts";

const NoticeDetailPage:FC = () => {
    const [notice, setNotice] = useState<INotice>();

    const {noticeId} = useParams();

    const {userData} = useUserDataStore();

    const timeStamp = useMemo(() => {
        return notice?.createdAt ? getTimeStamp(notice.createdAt): '';
    },[notice?.createdAt]);

    const memoizedText = useMemo(() => {
        return notice?.content ? generateLinksAndLineBreaks(notice.content) : '';
    }, [notice?.content]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchNotice = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/notices/${noticeId}`,
            });
            setNotice(response.data);
        } catch (err) {
            console.error("공지 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, noticeId]);

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항"}/>
            {!isLoading && notice ?
                <>
                    <NoticeInfoWrapper>
                        <h2>{notice.title}</h2>

                        <div>
                            <span>{timeStamp}</span>
                            {userData?.role === "admin" || userData?.role === "manager" && noticeId &&
                              <Dropdown type={"notice"} id={noticeId}/>
                            }
                        </div>
                        <hr/>
                    </NoticeInfoWrapper>
                    {notice.content &&
                      <p dangerouslySetInnerHTML={{__html: memoizedText}}/>
                    }
                </>
                :
                <LoadingLoop/>
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

export default NoticeDetailPage;