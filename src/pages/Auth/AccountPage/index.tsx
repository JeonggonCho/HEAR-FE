import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ProfileCard from "@components/account/ProfileCard";
import Button from "@components/common/Button";
import StatusCard from "@components/account/StatusCard";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
import Link from "@components/common/Link";
import ArrowBack from "@components/common/ArrowBack";
import Divider from "@components/common/Divider";
import HeadTag from "@components/common/HeadTag";
import Toast from "@components/common/Toast";

import useRequest from "@hooks/useRequest.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from "@constants/navCategories.ts";

import {BtnsWrapper, Container, DeleteUserWrapper, LinkWrapper, SettingWrapper} from "./style.ts";

import userImg from "@assets/images/manager.png";
import machine from "@assets/images/machine.png";
import reservation from "@assets/images/my_reservation.png";
import setting from  "@assets/icons/setting.svg";
import history from "@assets/images/history.png";
import siren from "@assets/images/siren.png";
import notice from "@assets/images/notice.png";

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

    const AccountHeaderRight:FC = () => (
        <SettingWrapper onClick={() => navigate("/setting")}>
            <ReactSVG src={setting}/>
        </SettingWrapper>
    );

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
            <HeadTag title={userInfo?.username || navCategories.account[lang]}/>

            <Header leftChild={<ArrowBack/>} rightChild={<AccountHeaderRight/>} type={"flex"}/>

            <ProfileCard isLoading={isLoading}/>

            <Divider/>

            {userData?.role === "student" &&
              <>
                <StatusCard isLoading={isLoading}/>
                <Divider/>
                <LinkWrapper>
                  <Link image={reservation} type={"card"} name={buttonCategories.myReservations[lang]} to={"/my-reservations"} isLoading={isLoading}/>
                  <Link image={history} type={"card"} name={buttonCategories.myUsage[lang]} to={"/my-usage"} isLoading={isLoading}/>
                  <Link image={notice} type={"card"} name={buttonCategories.myInquiries[lang]} to={"/my-inquiries"} isLoading={isLoading}/>
                  <Link image={siren} type={"card"} name={buttonCategories.myWarning[lang]} to={"/my-warning"} isLoading={isLoading}/>
                </LinkWrapper>
              </>
            }

            {(userData?.role === "manager" || userData?.role === "admin") && (
                <LinkWrapper>
                    <Link image={reservation} name={buttonCategories.reservationManagement[lang]} to={"/management/reservations"} type={"card"} isLoading={isLoading}/>
                    <Link image={userImg} name={buttonCategories.userManagement[lang]} to={"/management/users"} type={"card"} isLoading={isLoading}/>
                    <Link image={machine} name={buttonCategories.machineManagement[lang]} to={"/management/machines"} type={"card"} isLoading={isLoading}/>
                </LinkWrapper>
            )}

            <BtnsWrapper>
                <Button
                    type={"button"}
                    content={buttonCategories.signOut[lang]}
                    width={"full"}
                    color={"second"}
                    scale={"big"}
                    onClick={() => setLogoutModal(true)}
                />

                <DeleteUserWrapper onClick={() => setUnregisterModal(true)}>
                    {buttonCategories.accountDeletion[lang]}
                </DeleteUserWrapper>
            </BtnsWrapper>

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
              <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default AccountPage;