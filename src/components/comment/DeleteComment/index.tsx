import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const DeleteComment = () => {
    const {lang} = useThemeStore();
    const {showModal, modalRef, backdropRef, setShowModal} = useModal();
    const {sendRequest} = useRequest();

    // 댓글 삭제
    const deleteComment = async () => {
        try {
            await sendRequest({
                url: `/comments/${props._id}`,
                method: "delete",
            });
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

    return (
        <>
            {showModal &&
              <ConfirmModal
                modalRef={modalRef}
                backdropRef={backdropRef}
                showModal={showModal}
                trigger={}
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
                        {buttonCategories.delete[lang]}
                    </Button>
                }
              />
            }
        </>
    );
};

export default DeleteComment;