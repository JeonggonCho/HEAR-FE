import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface IFetchInquiriesApiProps {
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const fetchInquiriesApi = async ({sendRequest}: IFetchInquiriesApiProps) => {
    try {
        const response = await sendRequest({
            url: "/inquiries"
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("문의 목록 조회 중 에러 발생: ", err);
    }
};

export default fetchInquiriesApi;