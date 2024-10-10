import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ProfileCard from "@components/account/ProfileCard";
import Button from "@components/common/Button";
import StatusCard from "@components/account/StatusCard";
import ReservationListCard from "@components/account/ReservationListCard";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
import ErrorContent from "@components/content/ErrorContent";
import Link from "@components/common/Link";
import CardLoading from "@components/skeleton/CardLoading";

import useRequest from "@hooks/useRequest.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {Container, HeaderWrapper, UpdateButtonWrapper} from "./style.ts";

import no_profile from "@assets/images/no_profile.png";
import machine from "@assets/images/machine.png";
import list from "@assets/images/list.png";
import noProfile from "@assets/icons/no_profile.svg";

const AccountPage:FC = () => {
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const [unregisterModal, setUnregisterModal] = useState<boolean>(false);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const navigate = useNavigate();

    const {userInfo, setUserInfo, clearUserInfo} = useUserInfoStore();
    const {userData, setUserData, clearUserData} = useUserDataStore();
    const {logout} = useAuthStore();
    const {lang} = useThemeStore();

    const fetchUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users",
            });
            const {userId, username, email, year, studentId, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab} = response.data;
            setUserData({year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab});
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
            <div>
                <ReactSVG src={noProfile}/>
            </div>
            <div>
                <p>{userInfo?.username}</p>
                <span>{userInfo?.email.split("@")[0]}</span>
            </div>
        </HeaderWrapper>
    );

    const AccountHeaderRight:FC = () => {
        const {lang} = useThemeStore();
        return (
            <Button
                type={"button"}
                content={buttonCategories.signOut[lang]}
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
                content={buttonCategories.close[lang]}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setLogoutModal(false)}
            />
        );
        const rightBtn = (
            <Button
                type={"submit"}
                content={buttonCategories.signOut[lang]}
                width={"full"}
                color={"danger"}
                scale={"normal"}
                onClick={handleLogout}
            />
        );
        return (
            <ConfirmContent text={messageCategories.signOut[lang]} leftBtn={leftBtn} rightBtn={rightBtn}/>
        );
    };

    const UnregisterContent = () => {
        const leftBtn = (
            <Button
                type={"button"}
                content={buttonCategories.close[lang]}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setUnregisterModal(false)}
            />
        );
        const rightBtn = (
            <Button
                type={"submit"}
                content={buttonCategories.accountDeletion[lang]}
                width={"full"}
                color={"danger"}
                scale={"normal"}
            />
        );
        return (
            <ConfirmContent
                text={messageCategories.accountDeletion[lang]}
                description={messageCategories.ifDeletingAccount[lang]}
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />
        );
    };

    return (
        <Container>
            <Header leftChild={<AccountHeaderLeft/>} rightChild={<AccountHeaderRight/>} type={"flex"}/>

            <ProfileCard isLoading={isLoading}/>

            <UpdateButtonWrapper>
                <Button type={"link"} content={buttonCategories.profileUpdate[lang]} width={"full"} color={"second"} scale={"normal"} to={"/account/update"}/>
                <Button type={"link"} content={buttonCategories.passwordChange[lang]} width={"full"} color={"second"} scale={"normal"} to={"/password/update"}/>
            </UpdateButtonWrapper>

            {userData?.role === "student" &&
              <>
                <StatusCard isLoading={isLoading}/>
                <ReservationListCard isLoading={isLoading}/>
                {/*<UsageListCard isLoading={isLoading}/>*/}
              </>
            }

            {(userData?.role === "manager" || userData?.role === "admin") && (
                isLoading ?
                    <>
                        <CardLoading heightValue={"85px"}/>
                        <CardLoading heightValue={"85px"}/>
                        <CardLoading heightValue={"85px"}/>
                    </>
                    :
                    <>
                        <Link image={list} name={buttonCategories.reservationManagement[lang]} to={"/management/reservations"} type={"card"} />
                        <Link image={no_profile} name={buttonCategories.userManagement[lang]} to={"/management/users"} type={"card"} />
                        <Link image={machine} name={buttonCategories.machineManagement[lang]} to={"/management/machines"} type={"card"} />
                    </>
            )}

            <Button
                type={"button"}
                content={buttonCategories.accountDeletion[lang]}
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