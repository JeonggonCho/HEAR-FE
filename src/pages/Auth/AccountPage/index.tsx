import {FC, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Flex from "@components/common/Flex";
import ProfileCard from "@components/account/ProfileCard";
import StatusCard from "@components/account/StatusCard";
import Link from "@components/common/Link";
import Divider from "@components/common/Divider";
import HeadTag from "@components/common/HeadTag";
import DeleteAccount from "@components/account/DeleteAccount";
import LogoutAccount from "@components/account/LogoutAccount";

import useRequest from "@hooks/useRequest.ts";
import useAuth from "@hooks/useAuth.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from "@constants/navCategories.ts";

import {Container, LinkWrapper, SettingWrapper} from "./style.ts";

import userImg from "@assets/images/assistant.png";
import machine from "@assets/images/machine.png";
import reservation from "@assets/images/my_reservation.png";
import setting from  "@assets/icons/setting.svg";
import history from "@assets/images/history.png";
import siren from "@assets/images/siren.png";
import notice from "@assets/images/notice.png";
import test from "@assets/images/test.png";


const AccountPage:FC = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {userInfo, setUserInfo} = useUserInfoStore();
    const {userData, setUserData} = useUserDataStore();
    const {logout} = useAuth();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    // 유저 정보 조회
    const fetchUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users",
            });
            const {userId, username, email, year, studentId, studio, passEducation, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab} = response.data;
            setUserData({year, studio, passEducation, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab});
            setUserInfo({userId, username, email, studentId});
        } catch (err) {
            console.error("유저 정보 조회 에러: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 회원탈퇴 요청
    const unregisterHandler = useCallback(async () => {
        if (!userInfo) return;
        try {
            const response = await sendRequest({
                url: `/users/${userInfo.userId}`,
                method: "delete",
            });
            if (response.data) {
                showToast(messageCategories.unregisterDone[lang], "success");
                logout();
                navigate("/login", {replace: true});
            }
        } catch (err) {
            console.log("회원탈퇴 요청 중 에러 발생: ", err);
        } finally {
            setShowUnregisterConfirmModal(false);
        }
    }, [sendRequest, userInfo]);

    const AccountHeaderRight:FC = () => (
        <SettingWrapper onClick={() => navigate("/setting")}>
            <ReactSVG src={setting}/>
        </SettingWrapper>
    );

    return (
        <>
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

                {(userData?.role === "assistant" || userData?.role === "admin") && (
                    <LinkWrapper>
                        <Link image={reservation} name={buttonCategories.reservationManagement[lang]} to={"/management/reservations"} type={"card"} isLoading={isLoading}/>
                        <Link image={userImg} name={buttonCategories.userManagement[lang]} to={"/management/users"} type={"card"} isLoading={isLoading}/>
                        <Link image={machine} name={buttonCategories.machineManagement[lang]} to={"/management/machines"} type={"card"} isLoading={isLoading}/>
                        <Link image={test} name={buttonCategories.eduManagement[lang]} to={"/management/education"} type={"card"} isLoading={isLoading}/>
                    </LinkWrapper>
                )}

                <Flex
                    align={"center"}
                    direction={"column"}
                    gap={16}
                    style={{padding: "24px"}}
                >
                    <LogoutAccount/>
                    <DeleteAccount/>
                </Flex>
            </Container>
        </>
    );
};

export default AccountPage;