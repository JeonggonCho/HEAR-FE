import Header from "@components/Header";
import {FC, useState} from "react";
import {Container, UserName} from "./style.ts";
import HollowBtn from "@components/HollowBtn";
import ProfileCard from "@components/ProfileCard";
import ColoredBtn from "@components/ColoredBtn";
import StatusCard from "@components/StatusCard";
import CountOfLaserCard from "@components/CountOfLaserCard";
import ReservationListCard from "@components/ReservationListCard";
import UsageListCard from "@components/UsageListCard";
import Modal from "@components/Modal";
import ConfirmModalContent from "@components/ConfirmModalContent";

const AccountPage = () => {
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const [unregisterModal, setUnregisterModal] = useState<boolean>(false);

    const AccountHeaderLeft:FC = () => <h2><UserName>조정곤</UserName>님 안녕하세요</h2>;

    const AccountHeaderRight:FC = () => {
        return (
            <HollowBtn
                type={"button"}
                content={"로그아웃"}
                width={"fit"}
                color={"second"}
                scale={"small"}
                onClick={() => setLogoutModal(true)}
            />
        )
    };

    const LogoutModalContent = () => {
        const leftBtn = (
            <ColoredBtn
                type={"button"}
                content={"닫 기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setLogoutModal(false)}
            />
        );
        const rightBtn = (
            <ColoredBtn
                type={"submit"}
                content={"로그아웃"}
                width={"full"}
                color={"danger"}
                scale={"normal"}
            />
        );
        return (
            <ConfirmModalContent text={"로그아웃 하시겠습니까?"} leftBtn={leftBtn} rightBtn={rightBtn}/>
        );
    };

    const UnregisterModalContent = () => {
        const leftBtn = (
            <ColoredBtn
                type={"button"}
                content={"닫 기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setUnregisterModal(false)}
            />
        );
        const rightBtn = (
            <ColoredBtn
                type={"submit"}
                content={"탈퇴하기"}
                width={"full"}
                color={"danger"}
                scale={"normal"}
            />
        );
        return (
            <ConfirmModalContent
                text={"탈퇴 하시겠습니까?"}
                description={"탈퇴 시, 경고 내역을 제외한 유저의 교육 이수 내역 및 모든 정보는 삭제됩니다"}
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />
        );
    };

    return (
        <Container>
            <Header leftChild={<AccountHeaderLeft/>} rightChild={<AccountHeaderRight/>}/>
            <ProfileCard/>
            <div>
                <ColoredBtn type={"link"} content={"내정보 수정"} width={"full"} color={"second"} scale={"small"} to={"/account/update"}/>
                <ColoredBtn type={"link"} content={"비밀번호 변경"} width={"full"} color={"second"} scale={"small"} to={"/password/update"}/>
            </div>
            <StatusCard/>
            <CountOfLaserCard/>
            <ReservationListCard/>
            <UsageListCard/>
            <HollowBtn
                type={"button"}
                content={"탈퇴하기"}
                width={"full"}
                color={"danger"}
                scale={"big"}
                onClick={() => setUnregisterModal(true)}
            />

            {logoutModal &&
              <Modal
                content={<LogoutModalContent/>}
                setModal={setLogoutModal}
              />
            }

            {unregisterModal &&
              <Modal
                content={<UnregisterModalContent/>}
                setModal={setUnregisterModal}
              />
            }
        </Container>
    );
};

export default AccountPage;