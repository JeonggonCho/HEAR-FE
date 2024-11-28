import {IRequestProps} from "@hooks/useRequest.ts";
import {AxiosResponse} from "axios";


interface IUnregisterUserApiProps {
    userId: string;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const unregisterUserApi = async ({userId, sendRequest}: IUnregisterUserApiProps) => {
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

export default unregisterUserApi;