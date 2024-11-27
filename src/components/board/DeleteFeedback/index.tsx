import Button from "@components/common/Button";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const DeleteFeedback = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    // 피드백 삭제
    // const deleteFeedback = async () => {
    //     try {
    //         await sendRequest({
    //             url: `/feedback/${feedbackId}`,
    //             method: "delete",
    //         });
    //         navigate(-1);
    //     } catch (err) {
    //         console.error("피드백 삭제 중 에러 발생: ", err);
    //     }
    // };

    const deleteFeedback = () => {};

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            trigger={<></>}
            header={
                <h4 css={confirmModalHeader}>
                    {messageCategories.delete[lang]}
                </h4>
            }
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"third"}
                    size={"md"}
                    onClick={() => setShowModal(false)}
                >
                    {buttonCategories.delete[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"submit"}
                    variant={"filled"}
                    width={"full"}
                    color={"danger"}
                    size={"md"}
                    onClick={deleteFeedback}
                >
                    {buttonCategories.close[lang]}
                </Button>
            }
        />
    );
};

export default DeleteFeedback;