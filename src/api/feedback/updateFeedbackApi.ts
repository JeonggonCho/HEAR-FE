import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface IUpdateFeedbackApiProps {
    data: any;
    feedbackId: string;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const updateFeedbackApi = async ({data, feedbackId, sendRequest}: IUpdateFeedbackApiProps) => {
    try {
        const response = await sendRequest({
            url: `/feedback/${feedbackId}`,
            method: "patch",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("피드백 수정 중 에러 발생: ", err);
    }
};

export default updateFeedbackApi;