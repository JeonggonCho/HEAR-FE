import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import Button from "@components/common/Button";
import updateInquiryApi from "@api/inquiry/updateInquiryApi.ts";
import {UpdateInquiryFormContext} from "@components/inquiry/UpdateInquiryForm";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const UpdateInquiry = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {formData, isValid, inquiryId} = useContext(UpdateInquiryFormContext);
    const {sendRequest} = useRequest();

    const confirmUpdateHandler = async () => {
        if (formData && inquiryId) {
            try {
                await updateInquiryApi({data: formData, inquiryId, sendRequest});
                navigate(`/board/inquiry/${inquiryId}`, {replace: true});
            } catch (err) {
                console.error("문의 수정 에러: ", err);
            } finally {
                setShowModal(false);
            }
        }
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            setShowModal={setShowModal}
            showModal={showModal}
            trigger={
                <Button
                    type={"submit"}
                    variant={"filled"}
                    color={"primary"}
                    width={"full"}
                    size={"lg"}
                    disabled={!isValid}
                    onClick={() => setShowModal(true)}
                >
                    {buttonCategories.editing[lang]}
                </Button>
            }
            header={
                <h4 css={confirmModalHeader}>
                    {messageCategories.confirmUpdateInquiry[lang]}
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

export default UpdateInquiry;