import {AxiosResponse} from "axios";
import {IRequestProps} from "@hooks/useRequest.ts";


interface ICreateInquiryApiProps {
    data: any;
    sendRequest: ({url, method, data, header}: IRequestProps) => Promise<AxiosResponse<any, any>>;
}


const createInquiryApi = async ({data, sendRequest}: ICreateInquiryApiProps) => {
    try {
        const response = await sendRequest({
            url: "/inquiries/new",
            method: "post",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("문의 생성 시 에러 발생: ", err);
    }
};

export default createInquiryApi;