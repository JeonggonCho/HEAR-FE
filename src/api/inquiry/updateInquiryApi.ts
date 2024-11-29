import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface IUpdateInquiryApiProps {
    data: any;
    inquiryId: string;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const updateInquiryApi = async ({data, inquiryId, sendRequest}: IUpdateInquiryApiProps) => {
    try {
        const response = await sendRequest({
            url: `/inquiries/${inquiryId}`,
            method: "patch",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("문의 수정 에러: ", err);
    }
};

export default updateInquiryApi;