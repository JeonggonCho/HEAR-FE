import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface IFetchWarningsApiProps {
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const fetchWarningsApi = async ({sendRequest}: IFetchWarningsApiProps) => {
    try {
        const response = await sendRequest({
            url: "/users/warnings",
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("경고 조회 중 에러 발생: ", err);
    }
};

export default fetchWarningsApi;