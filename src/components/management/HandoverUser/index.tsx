import {useNavigate} from "react-router-dom";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import useAuth from "@hooks/useAuth.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const HandoverUser = ({userId}: {userId: string}) => {
    const navigate = useNavigate();
    const {showToast} = useToastStore();
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();
    const {logout} = useAuth();

    // 조교 역할 인수인계 하기
    const handoverAssistant = async () => {
        try {
            const response = await sendRequest({
                url: `/users/handover-assistant/${userId}`,
                method: "patch",
                data: {},
            });
            if (response.data) {
                showToast(messageCategories.handoverDone[lang], "success");
                logout();
                navigate("/login", {replace: true});
            }
        } catch (err) {
            console.error("조교 역할 인수 인계 중 에러 발생: ", err);
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
            header={
                <h4 css={confirmModalHeader}>{messageCategories.handover[lang]}</h4>
            }
            subMessage={
                <p css={confirmModalSubMessage}>{messageCategories.warningHandover[lang]}</p>
            }
            trigger={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"second"}
                    size={"sm"}
                    onClick={() => setShowModal(true)}
                >
                    {buttonCategories.handover[lang]}
                </Button>
            }
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"third"}
                    size={"md"}
                    width={"full"}
                    onClick={() => setShowModal(false)}
                >
                    {buttonCategories.cancel[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"danger"}
                    size={"md"}
                    width={"full"}
                    onClick={handoverAssistant}
                >
                    {buttonCategories.handover[lang]}
                </Button>
            }
        />
    );
};

export default HandoverUser;