import {IRequestProps} from "@hooks/useRequest.ts";
import {AxiosResponse} from "axios";


interface IFetchUserApiProps {
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const fetchUserApi = async ({sendRequest}: IFetchUserApiProps) => {
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

export default fetchUserApi;