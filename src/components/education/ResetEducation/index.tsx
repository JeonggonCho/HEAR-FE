import {useContext} from "react";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationContext from "@context/EducationContext.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/Modal/style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const ResetTest = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, setShowModal, showModal} = useModal();
    const {reset} = useContext(EducationContext);

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
                    color={"second"}
                    size={"sm"}
                    onClick={() => setShowModal(true)}
                >
                    {buttonCategories.reset[lang]}
                </Button>
            }
            header={<h4 css={confirmModalHeader}>{cardCategories.eraseAnswers[lang]}</h4>}
            subMessage={<p css={confirmModalSubMessage}>{messageCategories.warningEraseAnswers[lang]}</p>}
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"third"}
                    size={"md"}
                    onClick={() => setShowModal(false)}
                >
                    {buttonCategories.cancel[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"danger"}
                    size={"md"}
                    onClick={() => {
                        reset();
                        setShowModal(false);
                    }}
                >
                    {buttonCategories.reset[lang]}
                </Button>
            }
        />
    );
};

export default ResetTest;