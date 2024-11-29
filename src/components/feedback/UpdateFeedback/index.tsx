import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import updateFeedbackApi from "@api/feedback/updateFeedbackApi.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {UpdateFeedbackFormContext} from "@components/feedback/UpdateFeedbackForm";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const UpdateFeedback = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {formData, isValid, feedbackId} = useContext(UpdateFeedbackFormContext);
    const {sendRequest} = useRequest();

    const confirmUpdateHandler = async () => {
        if (formData && feedbackId) {
            try {
                await updateFeedbackApi({data: formData, feedbackId, sendRequest})
                navigate(`/board/feedback/${feedbackId}`, {replace: true});
            } catch (err) {
                console.error("피드백 수정 중 에러 발생: ", err);
            } finally {
                setShowModal(false);
            }
        }
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            trigger={
                <Button
                    type={"submit"}
                    variant={"filled"}
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                    disabled={!isValid}
                    onClick={() => setShowModal(true)}
                >
                    {buttonCategories.editing[lang]}
                </Button>
            }
            header={
                <h4 css={confirmModalHeader}>
                    {messageCategories.confirmUpdateFeedback[lang]}
                </h4>
            }
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"third"}
                    width={"full"}
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
                    color={"approval"}
                    width={"full"}
                    size={"md"}
                    onClick={confirmUpdateHandler}
                >
                    {buttonCategories.editing[lang]}
                </Button>
            }
        />
    );
};

export default UpdateFeedback;