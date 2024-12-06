import {useState} from "react";
import {Modal} from "@components/common/Modal";
import Backdrop from "@components/common/Backdrop";
import UserInfoCard from "@components/common/UserInfoCard";
import DeleteUser from "@components/management/DeleteUser";
import Flex from "@components/common/Flex";
import useModal from "@hooks/useModal.ts";
import {IUserInfo} from "@/types/user.ts";
import { Container } from "./style.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";


const UserListItem = (props: IUserInfo) => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(props);

    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    // 유저 정보 받아 유저 정보 업데이트하기
    const userInfoUpdateHandler = (updatedUser: IUserInfo) => {
        setUserInfo(updatedUser);
    };

    return (
        <>
            <Modal.Trigger onOpen={() => setShowModal(true)}>
                <Container pass={userInfo.passEducation}>
                    <span>{userInfo.username}</span>
                    <span>{userInfo.year}</span>
                    <span>{userInfo.countOfWarning}</span>
                    <span>{userInfo.passEducation ? cardCategories.pass[lang] : cardCategories.fail[lang]}</span>
                    <Flex align={"center"} justify={"center"}>
                        <div onClick={e => e.stopPropagation()}>
                            <DeleteUser userId={userInfo.userId}/>
                        </div>
                    </Flex>
                </Container>
            </Modal.Trigger>
            {showModal &&
              <Modal.Portal>
                <Backdrop ref={backdropRef}>
                  <Modal ref={modalRef}>
                    <UserInfoCard
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

export default UserListItem;
