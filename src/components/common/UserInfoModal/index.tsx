import {ReactNode, useState} from "react";
import {Modal} from "@components/common/Modal";
import Backdrop from "@components/common/Backdrop";
import UserInfoModalContent from "@components/common/UserInfoModal/UserInfoModalContent.tsx";
import useModal from "@hooks/useModal.ts";
import {IUserInfo} from "@/types/user.ts";


interface IUserInfoModalProps {
    trigger: ReactNode;
}


const UserInfoModal = (props: IUserInfo & IUserInfoModalProps) => {
    const [_, setUserInfo] = useState<IUserInfo>(props);

    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    // 유저 정보 받아 유저 정보 업데이트하기
    const userInfoUpdateHandler = (updatedUser: IUserInfo) => {
        setUserInfo(updatedUser);
    };

    return (
        <>
            <Modal.Trigger onOpen={() => setShowModal(true)}>
                {props.trigger}
            </Modal.Trigger>

            {showModal &&
              <Modal.Portal>
                <Backdrop ref={backdropRef}>
                  <Modal ref={modalRef}>
                    <UserInfoModalContent
                      userId={props.userId}
                      setModal={setShowModal}
                      onUserInfoUpdate={userInfoUpdateHandler}
                    />
                  </Modal>
                </Backdrop>
              </Modal.Portal>
            }
        </>
    );
};

export default UserInfoModal;
