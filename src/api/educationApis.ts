import useRequest from "@hooks/useRequest.ts";


// 문제 가져오기
const fetchQuestions = async () => {
    const {sendRequest} = useRequest();
    try {
        const response = await sendRequest({ url: "/education/questions" });
        if (response.data) {
            return response.data.questions;
        }
        return [];
    } catch (err) {
        console.error("문제 조회 중 에러 발생: ", err);
        throw err;
    }
};


// 문제 제출하기
const submitTest = async (data: { testAnswers: any; year: string; studio: string }) => {
    const { sendRequest } = useRequest();
    try {
        const response = await sendRequest({
            url: "/education/check",
            method: "post",
            data,
        });
        return response.data; // 응답 데이터 반환
    } catch (err) {
        console.error("문제 제출 중 에러 발생: ", err);
        throw err;
    }
};

export {fetchQuestions, submitTest}