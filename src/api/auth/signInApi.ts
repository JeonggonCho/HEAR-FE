import {IRequestProps} from "@hooks/useRequest.ts";
import {AxiosResponse} from "axios";


interface ISignInApiProps {
    data: any;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const signInApi = async (
    {
        data,
        sendRequest
    }: ISignInApiProps
) => {
    try {
        const response = await sendRequest({
            url: "/users/login",
            method: "post",
            data: data
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.log("로그인 실패: ", err);
    }
};

export default signInApi;