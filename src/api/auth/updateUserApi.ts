import {IRequestProps} from "@hooks/useRequest.ts";
import {AxiosResponse} from "axios";


interface IUpdateUserApiProps {
    data: any;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const updateUserApi = async ({data, sendRequest}: IUpdateUserApiProps) => {
    if (!data) return;
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

export default updateUserApi;