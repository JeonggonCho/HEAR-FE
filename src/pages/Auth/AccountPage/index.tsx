import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import Header from "@components/Header";
import ProfileCard from "@components/ProfileCard";
import ColoredBtn from "@components/ColoredBtn";
import StatusCard from "@components/StatusCard";
import CountOfLaserCard from "@components/CountOfLaserCard";
import ReservationListCard from "@components/ReservationListCard";
import UsageListCard from "@components/UsageListCard";
import Modal from "@components/Modal";
import ConfirmContent from "@components/ConfirmContent";
import LoadingLoop from "@components/LoadingLoop";
import ErrorContent from "@components/ErrorContent";

import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, UserName} from "./style.ts";


const AccountPage:FC = () => {
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const [unregisterModal, setUnregisterModal] = useState<boolean>(false);
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const navigate = useNavigate();

    const {userInfo, setUserInfo, clearUserInfo} = useUserInfoStore();
    const {setUserData, clearUserData} = useUserDataStore();
    const {logout} = useAuthStore();

    const fetchUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users",
                method: "get",
            });
            const {userId, username, email, year, studentId, studio, passQuiz, countOfLaser, countOfWarning, tel, role} = response.data;
            setUserData({year, studio, passQuiz, countOfLaser, countOfWarning, tel, role});
            setUserInfo({userId, username, email, studentId});
        } catch (err) {
            console.error("유저 정보 조회 에러: ", err);
        }
    }, [sendRequest]);

    // 유저 정보 조회
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleLogout = () => {
        logout();
        clearUserInfo();
        clearUserData();
        navigate("/login");
    };


    const AccountHeaderLeft:FC = () => <h2 style={{marginLeft: "6px"}}><UserName>{userInfo?.username}</UserName>님 안녕하세요</h2>;

    const AccountHeaderRight:FC = () => {
        return (
            <ColoredBtn
                type={"button"}
                content={"로그아웃"}
                width={"fit"}
                color={"second"}
                scale={"small"}
                onClick={() => setLogoutModal(true)}
            />
        )
    };

    const LogoutContent = () => {
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
                onClick={handleLogout}
            />
        );
        return (
            <ConfirmContent text={"로그아웃 하시겠습니까?"} leftBtn={leftBtn} rightBtn={rightBtn}/>
        );
    };

    const UnregisterContent = () => {
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
                content={"탈 퇴"}
                width={"full"}
                color={"danger"}
                scale={"normal"}
            />
        );
        return (
            <ConfirmContent
                text={"탈퇴 하시겠습니까?"}
                description={"탈퇴 시, 교육 이수 내역 및 모든 정보는 삭제됩니다"}
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />
        );
    };

    return (
        <Container>
            <Header leftChild={<AccountHeaderLeft/>} rightChild={<AccountHeaderRight/>}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <ProfileCard/>
                    <div>
                        <ColoredBtn type={"link"} content={"내정보 수정"} width={"full"} color={"second"} scale={"normal"} to={"/account/update"}/>
                        <ColoredBtn type={"link"} content={"비밀번호 변경"} width={"full"} color={"second"} scale={"normal"} to={"/password/update"}/>
                    </div>
                    <StatusCard/>
                    <CountOfLaserCard/>
                    <ReservationListCard/>
                    <UsageListCard/>

                    <ColoredBtn
                        type={"button"}
                        content={"탈퇴하기"}
                        width={"full"}
                        color={"second"}
                        scale={"big"}
                        onClick={() => setUnregisterModal(true)}
                    />

                    {logoutModal &&
                      <Modal
                        content={<LogoutContent/>}
                        setModal={setLogoutModal}
                        type={"popup"}
                      />
                    }

                    {unregisterModal &&
                      <Modal
                        content={<UnregisterContent/>}
                        setModal={setUnregisterModal}
                        type={"popup"}
                      />
                    }
                </>
            }

            {errorText &&
                <Modal
                    content={<ErrorContent text={errorText} closeModal={clearError}/>}
                    setModal={clearError}
                    type={"popup"}
                />
            }
        </Container>
    );
};

export default AccountPage;