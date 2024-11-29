import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface IFetchFeedbackApiProps {
    feedbackId: string;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const fetchFeedbackApi = async ({feedbackId, sendRequest}: IFetchFeedbackApiProps) => {
    try {
        const response = await sendRequest({
            url: `/feedback/${feedbackId}`
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("피드백 조회 중 에러 발생: ", err);
    }
};

export default fetchFeedbackApi;