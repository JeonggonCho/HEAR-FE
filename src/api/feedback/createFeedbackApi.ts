import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface ICreateFeedbackApiProps {
    data: any;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const createFeedbackApi = async ({data, sendRequest}: ICreateFeedbackApiProps) => {
    try {
        const response = await sendRequest({
            url: "/feedback/new",
            method: "post",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("피드백 생성 중 에러 발생: ", err);
    }
};

export default createFeedbackApi;