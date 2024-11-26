import useRequest from "@hooks/useRequest.ts";


// 유저 정보 조회
export const fetchUser = async () => {
    const {sendRequest} = useRequest();
    try {
        const response = await sendRequest({
            url: "/users",
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("유저 정보 조회 에러: ", err);
    }
};


// 회원탈퇴 요청
export const unregisterUser = async (userId: string) => {
    const {sendRequest} = useRequest();
    try {
        const response = await sendRequest({
            url: `/users/${userId}`,
            method: "delete",
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.log("회원탈퇴 요청 중 에러 발생: ", err);
    }
};


// 유저 정보 수정
export const updateUser = async (data: any) => {
    const {sendRequest} = useRequest();
    if (data!) return;
    try {
        const response = await sendRequest({
            url: "/users",
            method: "patch",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("내 정보 변경 중 에러 발생: ", err);
    }
};


// 비밀번호 변경 요청
export const updatePassword = async (data: any) => {
    const {sendRequest} = useRequest();
    if (!data) return;
    try {
        const response = await sendRequest({
            url: "/users/password",
            method: "patch",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("비밀번호 변경 중 에러 발생: ", err);
    }
};