import {useContext} from "react";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import UsersManagementContext from "@context/UsersManagementContext.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const DeleteUser = ({userId}: {userId: string}) => {
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();
    const {userList, setUserList} = useContext(UsersManagementContext);

    // 유저 삭제하기
    const deleteUser = async () => {
        try {
            const response = await sendRequest({
                url: `/users/${userId}`,
                method: "delete",
            });
            if (response.data) {
                // 유저 목록에서 삭제된 유저 제거
                const remainedUsers = userList.filter(user => user.userId.toString() !== response.data.deletedUserId.toString());
                setUserList(remainedUsers);
                showToast(messageCategories.deleteUserDone[lang], "success");
            }
        } catch (err) {
            console.error("유저 삭제 중 에러 발생: ", err);
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
                <h4 css={confirmModalHeader}>{messageCategories.delete[lang]}</h4>
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
                    {buttonCategories.deletion[lang]}
                </Button>
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
                    onClick={deleteUser}
                >
                    {buttonCategories.deletion[lang]}
                </Button>
            }
        />
    );
};

export default DeleteUser;