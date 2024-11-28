import {IRequestProps} from "@hooks/useRequest.ts";
import {AxiosResponse} from "axios";


interface IUpdatePasswordApiProps {
    data: any;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const updatePasswordApi = async ({data, sendRequest}: IUpdatePasswordApiProps) => {
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

export default updatePasswordApi;