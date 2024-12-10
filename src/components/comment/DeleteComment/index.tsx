import {Dispatch, RefObject, SetStateAction, useContext} from "react";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import CommentContext from "@context/CommentContext.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface IDeleteCommentProps {
    modalRef: RefObject<HTMLDivElement>;
    backdropRef: RefObject<HTMLDivElement>;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}


const DeleteComment = (
    {
        modalRef,
        backdropRef,
        showModal,
        setShowModal,
    }: IDeleteCommentProps
) => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {commentId, setComments, setRefDoc} = useContext(CommentContext);

    // 댓글 삭제
    const deleteComment = async () => {
        try {
            await sendRequest({
                url: `/comments/${commentId}`,
                method: "delete",
            });
            // 댓글 목록에서 삭제된 댓글 제거
            setComments(prevState => prevState.filter((comment) => comment._id !== commentId));
            // 문의, 피드백, 공지에서 댓글 개수 1 빼기
            if (setRefDoc) {
                setRefDoc(prevState => ({
                    ...prevState,
                    comments: Math.max((prevState.comments as number) - 1, 0), // 0 미만 방지하기
                }));
            }
        } catch (err) {
            console.error("댓글 삭제 중 에러 발생: ", err);
        }
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={<>{buttonCategories.delete[lang]}</>}
            header={<h4 css={confirmModalHeader}>{messageCategories.delete[lang]}</h4>}
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"third"}
                    size={"md"}
                    onClick={() => setShowModal(false)}
                >
                    {buttonCategories.close[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"danger"}
                    size={"md"}
                    onClick={deleteComment}
                >
                    {buttonCategories.deletion[lang]}
                </Button>
            }
        />
    );
};

export default DeleteComment;