import {useNavigate} from "react-router-dom";
import useAuth from "@hooks/useAuth.ts";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import unregisterUserApi from "@api/auth/unregisterUserApi.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const DeleteAccount = () => {
    const navigate = useNavigate();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();
    const {lang} = useThemeStore();
    const {userInfo} = useUserInfoStore();
    const {showToast} = useToastStore();
    const {logout} = useAuth();


    const unregisterHandler = async () => {
        if (!userInfo) return;
        try {
            await unregisterUserApi({userId: userInfo.userId, sendRequest});
            showToast(messageCategories.unregisterDone[lang], "success");
            logout();
            navigate("/login", {replace: true});
        } catch (err) {
            console.log("회원탈퇴 요청 중 에러 발생: ", err);
        }
        setShowModal(false);
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            trigger={
                <Button
                    type={"button"}
                    width={"full"}
                    onClick={() => setShowModal(true)}
                    color={"third"}
                    size={"md"}
                    variant={"text"}
                >
                    {buttonCategories.accountDeletion[lang]}
                </Button>
            }
            header={
                <h4 css={confirmModalHeader}>
                    {messageCategories.accountDeletion[lang]}
                </h4>
            }
            subMessage={
                <p css={confirmModalSubMessage}>
                    {messageCategories.ifDeletingAccount[lang]}
                </p>
            }
            leftBtn={
                <Button
                    type={"button"}
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
                    type={"submit"}
                    width={"full"}
                    color={"danger"}
                    onClick={unregisterHandler}
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
