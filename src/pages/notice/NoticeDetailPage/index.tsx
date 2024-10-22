import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import Dropdown from "@components/common/Dropdown";
import HeadTag from "@components/common/HeadTag";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";

import useRequest from "@hooks/useRequest.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {INotice} from "@/types/componentProps.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container, NoticeInfoWrapper} from "./style.ts";

import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";


const NoticeDetailPage:FC = () => {
    const [notice, setNotice] = useState<INotice>();
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const {noticeId} = useParams();

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    const {isLoading: noticeIsLoading, errorText: noticeErrorText, sendRequest: noticeSendRequest, clearError: noticeClearError} = useRequest();
    const {errorText: deleteNoticeErrorText, sendRequest: deleteNoticeSendRequest, clearError: deleteNoticeClearError} = useRequest();

    // 공지 생성 일자
    const timeStamp = useMemo(() => {
        return notice?.createdAt ? getTimeStamp(notice.createdAt, lang): '';
    },[notice?.createdAt]);

    // 공지 내용 링크 처리
    const transformedText = useMemo(() => {
        return notice?.content ? generateLinksAndLineBreaks(notice.content) : '';
    }, [notice?.content]);

    // 공지 조회하기
    const fetchNotice = useCallback(async () => {
        try {
            const response = await noticeSendRequest({
                url: `/notices/${noticeId}`,
            });
            setNotice(response.data);
        } catch (err) {
            console.error("공지 조회 중 에러 발생: ", err);
        }
    }, [noticeSendRequest, noticeId]);

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    // 공지 삭제 확인 모달 띄우기
    const deleteNoticeConfirm = () => {
        setShowConfirmModal(true);
    };

    // 공지 삭제
    const deleteNotice = async () => {
        try {
            await deleteNoticeSendRequest({
                url: `/notices/${noticeId}`,
                method: "delete",
            });
            navigate(-1);
        } catch (err) {
            console.error("공지 삭제 중 에러 발생: ", err);
        }
    };

    // 공지 수정
    const updateNotice = () => {
        navigate(`/board/notice/${noticeId}/update`);
    };

    // 공지 드롭다운 메뉴목록
    const noticeDropdownMenus = [
        {icon: editIcon, label: buttonCategories.edit[lang], action: updateNotice},
        {icon: deleteIcon, label: buttonCategories.delete[lang], action: deleteNoticeConfirm},
    ];


    return (
        <Container>
            <HeadTag title={notice?.title || headerCategories.noticeDetail[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.noticeDetail[lang]}/>
            {!noticeIsLoading && notice ?
                <>
                    <NoticeInfoWrapper>
                        <h2>{notice.title}</h2>
                        <div>
                            <span>{timeStamp}</span>
                            {userData?.role === "admin" || userData?.role === "manager" && noticeId &&
                              <Dropdown dropdownMenus={noticeDropdownMenus}/>
                            }
                        </div>
                    </NoticeInfoWrapper>
                    <p dangerouslySetInnerHTML={{__html: transformedText}}/>
                </>
                :
                <LoadingLoop/>
            }

            {noticeErrorText &&
                <Toast text={noticeErrorText} setToast={noticeClearError} type={"error"}/>
            }

            {deleteNoticeErrorText &&
              <Toast text={deleteNoticeErrorText} setToast={deleteNoticeClearError} type={"error"}/>
            }

            {showConfirmModal &&
              <Modal
                content={
                    <ConfirmContent
                        text={messageCategories.delete[lang]}
                        leftBtn={<Button type={"button"} content={buttonCategories.close[lang]} color={"third"} scale={"normal"} width={"full"} onClick={() => setShowConfirmModal(false)}/> }
                        rightBtn={<Button type={"submit"} content={buttonCategories.delete[lang]} color={"danger"} scale={"normal"} width={"full"} onClick={deleteNotice}/>}
                    />
                }
                setModal={() => setShowConfirmModal(false)}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default NoticeDetailPage;