import {z} from "zod";

export const noticeQnaSchema = z.object({
    title: z
        .string()
        .min(1, "제목을 입력해주세요"),
    category: z
        .string()
        .min(1, "카테고리를 선택해주세요"),
    content: z
        .string()
        .min(10, "내용은 10자 이상 400자 이하로 작성해주세요")
        .max(400, "내용은 10자 이상 400자 이하로 작성해주세요"),
});