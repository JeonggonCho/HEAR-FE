import {z} from "zod";

const titleValidation = z.string().min(1, "제목을 입력해주세요");
const contentValidation = z.string()
    .min(10, "내용은 10자 이상 400자 이하로 작성해주세요")
    .max(400, "내용은 10자 이상 400자 이하로 작성해주세요");

const inquirySchema = z.object({
    title: titleValidation,
    category: z
        .enum(["machine", "reservation", "room", "etc"], {
            required_error: "카테고리를 선택해주세요"
        }),
    content: contentValidation,
});

const feedbackSchema = z.object({
    title: titleValidation,
    category: z
        .enum(["good", "bad", "suggest", "etc"], {
            required_error: "카테고리를 선택해주세요"
        }),
    content: contentValidation,
});

const noticeSchema = z.object({
    title: titleValidation,
    content: contentValidation,
});

export {inquirySchema, feedbackSchema, noticeSchema};