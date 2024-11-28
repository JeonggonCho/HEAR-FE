import {IRequestProps} from "@hooks/useRequest.ts";
import {AxiosResponse} from "axios";


interface IFindPasswordApiProps {
    data: any;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const findPasswordApi = async ({data, sendRequest}: IFindPasswordApiProps) => {
    try {
        const response = await sendRequest({
            url: "/users/find-password",
            method: "patch",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("비밀번호 찾기 중 에러 발생: ", err);
        throw new Error("비밀번호 찾기 요청 중 오류가 발생했습니다.");
    }
};

export default findPasswordApi;