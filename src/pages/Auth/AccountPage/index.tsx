import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import Header from "@components/common/Header";
import ProfileCard from "@components/account/ProfileCard";
import Button from "@components/common/Button";
import StatusCard from "@components/account/StatusCard";
import CountOfLaserCard from "@components/account/CountOfLaserCard";
import ReservationListCard from "@components/account/ReservationListCard";
import UsageListCard from "@components/account/UsageListCard";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";
import LinkCard from "@components/common/LinkCard";

import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, HeaderWrapper, UpdateButtonWrapper} from "./style.ts";

import no_profile from "@assets/images/no_profile.png";
import machine from "@assets/images/machine.png";
import list from "@assets/images/list.png";
import myPage from "@assets/images/manager.png";

const AccountPage:FC = () => {
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const [unregisterModal, setUnregisterModal] = useState<boolean>(false);
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const navigate = useNavigate();

    const {setUserInfo, clearUserInfo} = useUserInfoStore();
    const {userData, setUserData, clearUserData} = useUserDataStore();
    const {logout} = useAuthStore();

    const fetchUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users",
            });
            const {userId, username, email, year, studentId, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role} = response.data;
            setUserData({year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role});
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

    const AccountHeaderLeft:FC = () => (
        <HeaderWrapper>
            <img src={myPage} alt={"내정보"}/>
            <h2>내 정보</h2>
        </HeaderWrapper>
    );

    const AccountHeaderRight:FC = () => {
        return (
            <Button
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
            <Button
                type={"button"}
                content={"닫 기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setLogoutModal(false)}
            />
        );
        const rightBtn = (
            <Button
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
            <Button
                type={"button"}
                content={"닫 기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setUnregisterModal(false)}
            />
        );
        const rightBtn = (
            <Button
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
                description={"탈퇴 시, 유저의 모든 정보가 삭제됩니다"}
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

                    <UpdateButtonWrapper>
                        <Button type={"link"} content={"내정보 수정"} width={"full"} color={"second"} scale={"normal"} to={"/account/update"}/>
                        <Button type={"link"} content={"비밀번호 변경"} width={"full"} color={"second"} scale={"normal"} to={"/password/update"}/>
                    </UpdateButtonWrapper>

                    {userData?.role === "student" &&
                        <>
                          <StatusCard/>
                          <CountOfLaserCard/>
                          <ReservationListCard/>
                          <UsageListCard/>
                        </>
                    }

                    {(userData?.role === "manager" || userData?.role === "admin") && (
                        <>
                            <LinkCard image={list} name={"예약 관리"} to={"/management/reservations"} type={"linear"} />
                            <LinkCard image={no_profile} name={"유저 관리"} to={"/management/users"} type={"linear"} />
                            <LinkCard image={machine} name={"기기 관리"} to={"/management/machines"} type={"linear"} />
                        </>
                    )}

                    <Button
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