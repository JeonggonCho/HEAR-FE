import useModal from "@hooks/useModal.ts";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import {useThemeStore} from "@store/useThemeStore.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const DeleteAccount = () => {
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {lang} = useThemeStore();

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            trigger={
                <Button
                    width={"full"}
                    onClick={() => setShowModal(true)}
                    color={"third"}
                    size={"md"}
                    variant={"text"}
                >
                    {buttonCategories.accountDeletion[lang]}
                </Button>
            }
            header={<h4 css={confirmModalHeader}>{messageCategories.accountDeletion[lang]}</h4>}
            subMessage={<p css={confirmModalSubMessage}>{messageCategories.ifDeletingAccount[lang]}</p>}
            leftBtn={
                <Button
                    width={"full"}
                    color={"third"}
                    onClick={() => setShowModal(false)}
                    variant={"filled"}
                    size={"md"}
                >
                    {buttonCategories.close[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    width={"full"}
                    color={"danger"}
                    onClick={() => {}}
                    variant={"filled"}
                    size={"md"}
                >
                    {buttonCategories.accountDeletion[lang]}
                </Button>
            }
        />
    );
};

export default DeleteAccount;