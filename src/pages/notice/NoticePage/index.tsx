import {FC, useCallback, useEffect, useState} from "react";

import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import NoticeListItem from "@components/communication/NoticeListItem";
import Modal from "@components/common/Modal";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";

import {useUserDataStore} from "@store/useUserStore.ts";
import useRequest from "@hooks/useRequest.ts";
import {INotice} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const NoticePage:FC = () => {
    const [notices, setNotices] = useState<INotice[]>([]);
    const {userData} = useUserDataStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

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
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    {notices.length !== 0 ? notices.map((value, idx) => (
                            <NoticeListItem
                                key={idx}
                                title={value.title}
                                _id={value._id}
                                createdAt={value.createdAt}
                            />
                        ))
                        :
                        <Empty title={"작성된 공지사항이 없습니다"}/>
                    }

                    {userData?.role === "manager" &&
                      <FloatingButton to={"/communication/notice/new"}/>
                    }
                </>
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

export default NoticePage;