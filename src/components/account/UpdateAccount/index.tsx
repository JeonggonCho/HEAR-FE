import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import LoadingLoop from "@components/common/LoadingLoop";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import updateUserApi from "@api/auth/updateUserApi.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {UpdateAssistantContext} from "@components/account/UpdateAssistantAccountForm";
import {UpdateStudentContext} from "@components/account/UpdateStudentAccountForm";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";


const UpdateAccount = () => {
    const navigate = useNavigate();
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {showModal, setShowModal, modalRef, backdropRef} = useModal();
    const {isLoading, sendRequest} = useRequest({loadingTime: 2000});
    const {isValid: studentIsValid, formData: studentFormData} = useContext(UpdateStudentContext);
    const {isValid: assistantIsValid, formData: assistantFormData} = useContext(UpdateAssistantContext);

    const submitUpdateAccountHandler = async () => {
        if (userData?.role === "student" && !studentFormData) return;
        if (userData?.role === "assistant" && !assistantFormData) return;
        try {
            const data = userData?.role === "student" ? studentFormData
                : userData?.role === "assistant" ? assistantFormData
                    : null;
            await updateUserApi({data, sendRequest});
            showToast(messageCategories.updateAccountDone[lang], "success");
            navigate("/account", {replace: true});
        } catch (err) {
            console.error("내 정보 변경 중 에러 발생: ", err);
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
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                    onClick={() => setShowModal(true)}
                    disabled={
                        userData?.role === "student" ? !studentIsValid
                            : userData?.role === "assistant" ? !assistantIsValid
                                : true
                    }
                >
                    {buttonCategories.profileUpdate[lang]}
                </Button>
            }
            header={<h4 css={confirmModalHeader}>{messageCategories.confirmUpdateAccount[lang]}</h4>}
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
                    onClick={submitUpdateAccountHandler}
                >
                    <Flex align={"center"} justify={"center"} gap={12}>
                        {buttonCategories.changing[lang]}
                        {isLoading &&
                          <LoadingLoop size={24} background={false} thickness={3} ringColor={"white"}/>
                        }
                    </Flex>
                </Button>
            }
        />
    );
};

export default UpdateAccount;