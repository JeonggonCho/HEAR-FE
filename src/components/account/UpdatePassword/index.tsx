import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import updatePasswordApi from "@api/auth/updatePasswordApi.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {UpdatePasswordContext} from "@components/account/UpdatePasswordForm";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {useToastStore} from "@store/useToastStore.ts";


const UpdatePassword = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();
    const {formData, isValid} = useContext(UpdatePasswordContext);

    const submitUpdatePasswordHandler = async () => {
        if (!formData) return;
        try {
            await updatePasswordApi({data: formData, sendRequest});
            showToast(messageCategories.updatePasswordDone[lang], "success");
            navigate("/account", {replace: true});
        } catch (err) {
            console.error("비밀번호 변경 중 에러 발생: ", err);
        } finally {
            setShowModal(false);
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
                    size={"lg"}
                    width={"full"}
                    disabled={!isValid}
                >
                    {buttonCategories.passwordChange[lang]}
                </Button>
            }
            header={
                <h4 css={confirmModalHeader}>{messageCategories.confirmUpdatePassword[lang]}</h4>
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
                    {buttonCategories.close[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"approval"}
                    size={"md"}
                    onClick={submitUpdatePasswordHandler}
                >
                    {buttonCategories.changing[lang]}
                </Button>
            }
        />
    );
};

export default UpdatePassword;
