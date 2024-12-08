import {useContext} from "react";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import TestContext from "@context/TestContext.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/Modal/style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const ResetTest = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, setShowModal, showModal} = useModal();
    const {setTestAnswers} = useContext(TestContext);

    // 작성된 답안 모두 지우기
    const eraseAnswers = () => {
        setTestAnswers(prevState => {
            return prevState.map(answer => ({
                ...answer,
                myAnswer: Array.isArray(answer.myAnswer) ? [] : "",
            }));
        });
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
                        eraseAnswers();
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