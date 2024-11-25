import React, {FC, FormEvent, useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Dropdown from "@components/common/Dropdown";
import HeadTag from "@components/common/HeadTag";
import Button from "@components/common/Button";
import {Modal} from "@components/common/Modal";
import ModalConfirmContent from "@components/common/ConfirmModal";
import Comments from "@components/board/Comments";

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container, DateAndCountsWrapper, NoticeContent, NoticeInfoWrapper} from "./style.ts";

import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";
import views from "@assets/icons/visible.svg";
import chat from "@assets/icons/chat.svg";


const NoticeDetailPage:FC = () => {
    const [notice, setNotice] = useState<INotice>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [emptyCommentContent, setEmptyCommentContent] = useState<boolean>(false);

    const navigate = useNavigate();
    const {noticeId} = useParams();

    const {userData} = useUserDataStore();
    const {lang, isDarkMode} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {errorText:commentErrorText, sendRequest:commentSendRequest, clearError:commentClearError} = useRequest();
    const {text, countOfText, handleTextChange, setText} = useTextarea();

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
            const response = await sendRequest({
                url: `/notices/${noticeId}`,
            });
            setNotice(response.data.notice);
            setComments(response.data.comments);
        } catch (err) {
            console.error("공지 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, noticeId]);

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    // 공지 삭제 확인 모달 띄우기
    const deleteNoticeConfirm = () => {
        setShowConfirmModal(true);
    };

    // 공지 삭제
    const deleteNotice = useCallback(async () => {
        try {
            await sendRequest({
                url: `/notices/${noticeId}`,
                method: "delete",
            });
            navigate(-1);
        } catch (err) {
            console.error("공지 삭제 중 에러 발생: ", err);
        }
    }, [sendRequest, noticeId]);

    // 공지 수정
    const updateNotice = () => {
        navigate(`/board/notice/${noticeId}/update`);
    };

    // 공지 드롭다운 메뉴목록
    const noticeDropdownMenus = [
        {icon: editIcon, label: buttonCategories.edit[lang], action: updateNotice},
        {icon: deleteIcon, label: buttonCategories.delete[lang], action: deleteNoticeConfirm},
    ];

    // 댓글 생성 요청하기
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            setEmptyCommentContent(true);
            return;
        }

        const data = {
            content: text.trim(),
            refId: noticeId,
            refType: "notice",
        };

        try {
            const response = await commentSendRequest({
                url: "/comments",
                method: "post",
                data: data,
            });
            if (response.data) {
                setComments(prevState => [response.data, ...prevState]);
                setNotice(prevState => {
                    if (!prevState) return prevState;
                    return ({
                        ...prevState,
                        comments: prevState.comments + 1
                    });
                });
            }
            setText("");
        } catch (err) {
            console.error("공지 댓글 생성 요청 중 에러 발생: ", err);
        }
    };

    // 댓글 공란 에러 메시지
    useEffect(() => {
        if (emptyCommentContent) showToast(messageCategories.emptyCommentError[lang], "error");
        const errorTimer = setTimeout(() => setEmptyCommentContent(false), 6000);
        return () => clearTimeout(errorTimer);
    }, [emptyCommentContent]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 댓글 에러 메시지
    useEffect(() => {
        if (commentErrorText) showToast(commentErrorText, "error");
        const errorTimer = setTimeout(() => commentClearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [commentErrorText]);


    return (
        <>
            <Container>
                <HeadTag title={notice?.title || headerCategories.noticeDetail[lang]}/>

                <Header leftChild={<ArrowBack/>} centerText={headerCategories.noticeDetail[lang]}/>
                {!isLoading && notice ?
                    <>
                        {/*공지 정보 부분*/}
                        <NoticeInfoWrapper>
                            <h2>{notice.title}</h2>
                            <div>
                                <DateAndCountsWrapper>
                                    <span>{timeStamp}</span>
                                    <div>
                                        <ReactSVG src={views}/>
                                        <span>{notice.views || 0}</span>
                                    </div>
                                    <div>
                                        <ReactSVG src={chat}/>
                                        <span>{notice.comments || 0}</span>
                                    </div>
                                </DateAndCountsWrapper>

                                {userData?.role === "admin" || userData?.role === "assistant" && noticeId &&
                                  <Dropdown dropdownMenus={noticeDropdownMenus}/>
                                }
                            </div>
                        </NoticeInfoWrapper>

                        {/*공지 내용 부분*/}
                        <NoticeContent darkmode={isDarkMode.toString()} dangerouslySetInnerHTML={{__html: transformedText}}/>

                        {/*댓글 부분*/}
                        <Comments
                            text={text}
                            countOfText={countOfText}
                            handleTextChange={handleTextChange}
                            comments={comments}
                            setComments={setComments}
                            setRefDoc={setNotice as React.Dispatch<React.SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
                            submitHandler={submitHandler}
                        />
                    </>
                    :
                    <LoadingLoop/>
                }
            </Container>

            {showConfirmModal &&
              <Modal
                content={
                    <ModalConfirmContent
                        text={messageCategories.delete[lang]}
                        leftBtn={<Button type={"button"} content={buttonCategories.close[lang]} color={"third"} scale={"normal"} width={"full"} onClick={() => setShowConfirmModal(false)}/> }
                        rightBtn={<Button type={"submit"} content={buttonCategories.delete[lang]} color={"danger"} scale={"normal"} width={"full"} onClick={deleteNotice}/>}
                    />
                }
                setModal={() => setShowConfirmModal(false)}
                type={"popup"}
              />
            }
        </>
    );
};

export default NoticeDetailPage;