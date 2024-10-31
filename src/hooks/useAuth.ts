import {useEffect} from "react";

import useRequest from "@hooks/useRequest.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";


const useAuth = () => {
    const {showToast} = useToastStore();
    const {userInfo} = useUserInfoStore();
    const {sendRequest, clearError, errorText} = useRequest();

    const {login, logout, accessToken, refreshToken, accessTokenExpirationDate, isLoggedIn} = useAuthStore((state) => ({
        login: state.login,
        logout: state.logout,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpirationDate: state.accessTokenExpirationDate,
        isLoggedIn: state.isLoggedIn,
    }));

    // 리프레시 토큰으로 액세스 토큰 재발급 받기, 리프레시 토큰 만료 시, 로그아웃
    const checkRefreshToken = async () => {
        try {
            const response = await sendRequest({
                url: "/users/refresh-token",
                method: "post",
                data: {refreshToken, userId: userInfo?.userId},
            });
            return response.data;
        } catch (err) {
            console.error("토큰 확인 중 에러 발생: ", err);
            return null;
        }
    };

    // 로그인 시 토큰 타이머 설정, 타이머 완료 시, 리프레시 토큰으로 액세스 토큰 재발급 요청
    useEffect(() => {
        if (accessToken && accessTokenExpirationDate) {
            // 만료일이 Date 객체인지 문자열인지 확인하고 문자열이면 Date 객체로 변환
            const expirationDate =
                typeof accessTokenExpirationDate === 'string'
                    ? new Date(accessTokenExpirationDate)
                    : accessTokenExpirationDate;

            // 만료일이 Date 객체이고 undefined나 null이 아니면 수행하기
            if (expirationDate instanceof Date && !isNaN(expirationDate.getTime())) {
                // 액세스 토큰 유효한 시간 산정
                const remainingTime = expirationDate.getTime() - new Date().getTime();

                // 타이머 생성 후, 타이머 종료 시, 리프레시 토큰 확인 요청 보내기
                const timer = setTimeout(async () => {
                    const result = await checkRefreshToken();
                    // 응답이 없거나, 리프레시 토큰이 유효하지 않으면 로그아웃
                    if (!result || !result.isRefreshTokenValid) {
                        console.log("리프레시 토큰 만료로 로그아웃");
                        logout();
                    } else {
                        // 리프레시 토큰이 유효하면 로그인 유지
                        console.log("리프레시 토큰 확인 후, 액세스 토큰 재발급을 받아 로그인");
                        login(result.accessToken, result.refreshToken);
                    }
                }, remainingTime);

                return () => clearTimeout(timer);
            }
        }
    }, [accessToken, accessTokenExpirationDate, logout, login]);


    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return {accessToken, login, logout, isLoggedIn};
};

export default useAuth;