import useRequest from "@hooks/useRequest.ts";


// 댓글 생성 요청하기
export const postComment = async (
    data: {
        content: string,
        refId: string,
        refType: "feedback" | "inquiry" | "notice"
    },
) => {
    const {sendRequest} = useRequest();
    try {
        const response = await sendRequest({
            url: "/comments",
            method: "post",
            data: data,
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("피드백 댓글 생성 요청 중 에러 발생: ", err);
    }
};


// 댓글 삭제
export const deleteComment = async (
    commentId: string,
) => {
    const {sendRequest} = useRequest();
    try {
        await sendRequest({
            url: `/comments/${commentId}`,
            method: "delete",
        });
    } catch (err) {
        console.error("댓글 삭제 중 에러 발생: ", err);
    }
};


// 댓글 수정
export const updateComment = async (
    commentId: string,
    text: string,
) => {
    const {sendRequest} = useRequest();
    try {
        const response = await sendRequest({
            url: `/comments/${commentId}`,
            method: "patch",
            data: {content: text},
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("댓글 수정 중 에러 발생: ", err);
    }
};


// 댓글 좋아요
export const likeComment = async (
    commentId: string,
) => {
    const {sendRequest} = useRequest();
    try {
        const response = await sendRequest({
            url: `/comments/like/${commentId}`,
            method: "post",
            data: {},
        });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        console.error("댓글 좋아요 중 에러 발생: ", err);
    }
};