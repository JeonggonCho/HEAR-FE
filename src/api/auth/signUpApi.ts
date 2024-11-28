import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface ISignUpApiProps {
    data: any;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const signUpApi = async ({data, sendRequest}: ISignUpApiProps) => {
    try {
        const response = await sendRequest({
            url: "/users/signup",
            method: "post",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("회원가입 실패: ", err);
    }
};

export default signUpApi;