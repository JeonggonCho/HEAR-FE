import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface IFetchFeedbackApiProps {
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const fetchFeedbacksApi = async ({sendRequest}: IFetchFeedbackApiProps) => {
    try {
        const response = await sendRequest({
            url: "/feedback",
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("피드백 목록 조회 중 에러 발생: ", err);
    }
};

export default fetchFeedbacksApi;