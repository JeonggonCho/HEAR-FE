import {useNavigate} from "react-router-dom";
import useModal from "@hooks/useModal.ts";
import useAuth from "@hooks/useAuth.ts";
import Button from "@components/common/Button";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const LogoutAccount = () => {
    const navigate = useNavigate();

    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {lang} = useThemeStore();
    const {logout} = useAuth();
    const {clearUserInfo} = useUserInfoStore();
    const {clearUserData} = useUserDataStore();

    // 로그아웃
    const logoutHandler = () => {
        logout();
        clearUserInfo();
        clearUserData();
        navigate("/login");
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            header={<h4 css={confirmModalHeader}>{messageCategories.signOut[lang]}</h4>}
            trigger={
                <Button
                    width={"full"}
                    onClick={() => setShowModal(true)}
                    color={"third"}
                    size={"lg"}
                    variant={"filled"}
                >
                    {buttonCategories.signOut[lang]}
                </Button>
            }
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
                    onClick={logoutHandler}
                    variant={"filled"}
                    size={"md"}
                >
                    {buttonCategories.signOut[lang]}
                </Button>
            }
        />
    );
};

export default LogoutAccount;