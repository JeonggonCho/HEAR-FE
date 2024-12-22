import {z} from "zod";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const BoardSchemaProvider = () => {
    const {lang} = useThemeStore();

    // 제목 유효성 검사
    const titleValidation = z.string().min(1, messageCategories.inputTitle[lang]);

    // 내용 유효성 검사
    const contentValidation = z.string()
        .min(10, messageCategories.minimumContent[lang])
        .max(400, messageCategories.maximumContent[lang]);

    // 댓글 유효성 검사
    const commentValidation = z.string().min(1);

    // 문의 스키마
    const inquirySchema = z.object({
        title: titleValidation,
        category: z.enum(["machine", "reservation", "room", "etc"], {
            required_error: messageCategories.selectCategory[lang],
        }),
        content: contentValidation,
    });

    // 피드백 스키마
    const feedbackSchema = z.object({
        title: titleValidation,
        category: z.enum(["good", "bad", "suggest", "etc"], {
            required_error: messageCategories.selectCategory[lang],
        }),
        content: contentValidation,
    });

    // 공지 스키마
    const noticeSchema = z.object({
        title: titleValidation,
        content: contentValidation,
    });

    // 댓글 스키마
    const commentSchema = z.object({
        content: commentValidation,
    });

    return {inquirySchema, feedbackSchema, noticeSchema, commentSchema};
};

export default BoardSchemaProvider;