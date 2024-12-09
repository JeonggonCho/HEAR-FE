import {useNavigate, useParams} from "react-router-dom";
import Button from "@components/common/Button";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const DeleteFeedback = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();
    const {feedbackId} = useParams();

    // 피드백 삭제
    const deleteFeedback = async () => {
        try {
            await sendRequest({
                url: `/feedback/${feedbackId}`,
                method: "delete",
            });
            navigate(-1);
        } catch (err) {
            console.error("피드백 삭제 중 에러 발생: ", err);
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
                    onClick={deleteFeedback}
                >
                    {buttonCategories.deletion[lang]}
                </Button>
            }
        />
    );
};

export default DeleteFeedback;