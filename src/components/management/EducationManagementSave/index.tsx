import {useContext} from "react";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import useModal from "@hooks/useModal.ts";
import Button from "@components/common/Button";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import EducationManagementContext from "@context/EducationManagementContext.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/Modal/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const EducationManagementSave = () => {
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();
    const {questions, setInitialQuestions, isModified} = useContext(EducationManagementContext);

    // 문제 저장하기
    const saveQuestions = async () => {
        const data = {questions: questions};
        try {
            const response = await sendRequest({
                url: "/education",
                method: "patch",
                data: data,
            });
            if (response.data) {
                showToast(messageCategories.questionSaveDone[lang], "success");
                setInitialQuestions(questions);
            }
        } catch (err) {
            console.error("문제 저장 중 에러 발생: ", err);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"fit"}
                    color={"primary"}
                    size={"sm"}
                    disabled={!isModified}
                    onClick={() => setShowModal(true)}
                >
                    {buttonCategories.save[lang]}
                </Button>
            }
            header={
                <h4 css={confirmModalHeader}>{messageCategories.confirmSaveQuestions[lang]}</h4>
            }
            subMessage={<p css={confirmModalSubMessage}>{messageCategories.warningSaveQuestions[lang]}</p>}
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    size={"md"}
                    color={"third"}
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
                    size={"md"}
                    color={"approval"}
                    onClick={saveQuestions}
                >
                    {buttonCategories.save[lang]}
                </Button>
            }
        />
    );
};

export default EducationManagementSave;