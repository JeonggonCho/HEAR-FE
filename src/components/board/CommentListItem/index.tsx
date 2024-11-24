import {FC, useEffect, useMemo, useRef, useState} from "react";

// import Button from "@components/common/Button";
import Dropdown from "@components/common/Dropdown";
import Textarea from "@components/common/Textarea";
import ProfileImage from "@components/common/ProfileImage";
import ConfirmModal from "@components/common/ConfirmModal";

import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import stripHtml from "@util/stripHtml.ts";
import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import useModal from "@hooks/useModal.ts";
import {IComment} from "@/types/comment.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";

import {
    AuthorWrapper,
    BtnsWrapper, CancelBtnWrapper,
    CommentBtnWrapper, CommentEditWrapper,
    Container,
    ContentWrapper, EditBtnWrapper,
    LeftPartWrapper,
    LikeBtnWrapper,
    RightPartWrapper,
    TimeWrapper
} from "./style.ts";

import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";
import Button from "@components/common/Button";
import {confirmModalHeader} from "@components/common/ConfirmModal/style.ts";


const CommentListItem:FC<IComment> = (props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(props.isLiked);
    const [countOfLike, setCountOfLike] = useState(props.likes);

    const {lang} = useThemeStore();
    const {userInfo} = useUserInfoStore();
    const {showToast} = useToastStore();
    const {text, countOfText, handleTextChange, setText} = useTextarea();
    const {errorText, clearError, sendRequest} = useRequest();
    const {showModal:showDeleteConfirmModal, modalRef:deleteModalRef, backdropRef:deleteBackdropRef, setShowModal:setShowDeleteConfirmModal} = useModal();

    // 댓글 링크 처리
    const transformedContent = useMemo(() => {
        return generateLinksAndLineBreaks(props.content);
    }, [props.content]);

    const [content, setContent] = useState(transformedContent);

    // textarea에 포커스를 주기위해 Ref 생성
    const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

    // 댓글 생성 일자
    const timeStamp = useMemo(() => {
        return props.createdAt ? getTimeStamp(props.createdAt, lang) : '';
    }, [props.createdAt]);

    // 댓글 삭제 확인 모달 띄우기
    const deleteCommentConfirm = () => {
        setShowDeleteConfirmModal(true);
    };

    // 댓글 삭제
    const deleteComment = async () => {
        try {
            await sendRequest({
                url: `/comments/${props._id}`,
                method: "delete",
            });
            close();
            // 댓글 목록에서 삭제된 댓글 제거
            props.setComments(prevState => prevState.filter((comment) => comment._id !== props._id));
            // 문의, 피드백, 공지에서 댓글 개수 1 빼기
            if (props.setRefDoc) {
                props.setRefDoc(prevState => ({
                    ...prevState,
                    comments: Math.max((prevState.comments as number) - 1, 0), // 0 미만 방지하기
                }));
            }
        } catch (err) {
            console.error("댓글 삭제 중 에러 발생: ", err);
        }
    };

    // 댓글 수정 모드로 변경
    const updateCommentMode = () => {
        const plainText = stripHtml(content);
        setText(plainText);
        setIsEditMode(true);
    };

    // 수정 모드가 되면 textarea 포커스 주기
    useEffect(() => {
        if (isEditMode && commentTextareaRef.current) {
            commentTextareaRef.current.focus();
        }
    }, [isEditMode]);

    // 댓글 수정 취소
    const cancelUpdateCommentMode = () => {
        setIsEditMode(false);
    };

    // 댓글 수정
    const updateComment = async () => {
        try {
            const response = await sendRequest({
                url: `/comments/${props._id}`,
                method: "patch",
                data: {content: text},
            });
            if (response.data) {
                const responseData = generateLinksAndLineBreaks(response.data.comment.content);
                setContent(responseData);
                setIsEditMode(false);
            }
        } catch (err) {
            console.error("댓글 수정 중 에러 발생: ", err);
        }
    };

    // 댓글 좋아요
    const likeComment = async () => {
        try {
            const response = await sendRequest({
                url: `/comments/like/${props._id}`,
                method: "post",
                data: {},
            });
            if (response.data) {
                if (isLiked) {
                    setCountOfLike(prevState => prevState -= 1);
                } else {
                    setCountOfLike(prevState => prevState += 1);
                }
                setIsLiked(prevState => !prevState);
            }
        } catch (err) {
            console.error("댓글 좋아요 중 에러 발생: ", err);
        }
    };

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 댓글 드롭다운 메뉴 목록
    const commentDropdownMenus = [
        {icon: editIcon, label: buttonCategories.edit[lang], action: updateCommentMode},
        {icon: deleteIcon, label: buttonCategories.delete[lang], action: deleteCommentConfirm},
    ];

    return (
        <Container>
            <LeftPartWrapper>
                <ProfileImage size={28}/>
                <div/>
            </LeftPartWrapper>

            <RightPartWrapper>
                <div>
                    <AuthorWrapper>{props.author}</AuthorWrapper>
                    {!isEditMode && props.authorId === userInfo?.userId && <Dropdown dropdownMenus={commentDropdownMenus}/>}
                </div>
                {isEditMode ?
                    <>
                        <CommentEditWrapper>
                            <Textarea
                                ref={commentTextareaRef}
                                name={"comment-content"}
                                showCount={false}
                                placeholder={placeholderCategories.comment[lang]}
                                countOfText={countOfText}
                                changeTextareaHandler={handleTextChange}
                                text={text}
                                isScrolled={false}
                            />
                            <BtnsWrapper>
                                <CancelBtnWrapper onClick={cancelUpdateCommentMode}>
                                    {buttonCategories.cancel[lang]}
                                </CancelBtnWrapper>
                                <EditBtnWrapper onClick={updateComment}>
                                    {buttonCategories.editing[lang]}
                                </EditBtnWrapper>
                            </BtnsWrapper>
                        </CommentEditWrapper>
                    </>
                    :
                    <>
                        <ContentWrapper dangerouslySetInnerHTML={{__html: content}}/>
                        <div>
                        <TimeWrapper>{timeStamp}</TimeWrapper>
                            <BtnsWrapper>
                                <LikeBtnWrapper onClick={likeComment} isLiked={isLiked}>
                                    {buttonCategories.like[lang]} {countOfLike || 0}
                                </LikeBtnWrapper>
                                <CommentBtnWrapper>
                                    {buttonCategories.comment[lang]}
                                </CommentBtnWrapper>
                            </BtnsWrapper>
                        </div>
                    </>
                }
            </RightPartWrapper>

            {/*{showConfirmModal &&*/}
            {/*  <Modal*/}
            {/*    content={*/}
            {/*        <ModalConfirmContent*/}
            {/*            text={messageCategories.delete[lang]}*/}
            {/*            leftBtn={<Button type={"button"} content={buttonCategories.close[lang]} color={"third"} scale={"normal"} width={"full"} onClick={() => setShowConfirmModal(false)}/> }*/}
            {/*            rightBtn={<Button type={"submit"} content={buttonCategories.delete[lang]} color={"danger"} scale={"normal"} width={"full"} onClick={deleteComment}/>}*/}
            {/*        />*/}
            {/*    }*/}
            {/*    setModal={() => setShowConfirmModal(false)}*/}
            {/*  />*/}
            {/*}*/}


            {showDeleteConfirmModal &&
                <ConfirmModal
                  modalRef={deleteModalRef}
                  backdropRef={deleteBackdropRef}
                  header={<h4 css={confirmModalHeader}>{messageCategories.delete[lang]}</h4>}
                  onClose={() => setShowDeleteConfirmModal(false)}
                  footer={
                      <>
                          <Button onClick={() => setShowDeleteConfirmModal(false)}>{buttonCategories.close[lang]}</Button>
                          <Button onClick={deleteComment}>{buttonCategories.delete[lang]}</Button>
                      </>
                  }
                />
            }
        </Container>
    );
};

export default CommentListItem;