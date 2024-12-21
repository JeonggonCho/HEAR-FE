import {z} from "zod";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const BoardSchemaProvider = () => {
    const {lang} = useThemeStore();

    const titleValidation = z.string().min(1, messageCategories.inputTitle[lang]);

    const contentValidation = z.string()
        .min(10, messageCategories.minimumContent[lang])
        .max(400, messageCategories.maximumContent[lang]);

    const inquirySchema = z.object({
        title: titleValidation,
        category: z.enum(["machine", "reservation", "room", "etc"], {
            required_error: messageCategories.selectCategory[lang],
        }),
        content: contentValidation,
    });

    const feedbackSchema = z.object({
        title: titleValidation,
        category: z.enum(["good", "bad", "suggest", "etc"], {
            required_error: messageCategories.selectCategory[lang],
        }),
        content: contentValidation,
    });

    const noticeSchema = z.object({
        title: titleValidation,
        content: contentValidation,
    });

    return {inquirySchema, feedbackSchema, noticeSchema};
};

export default BoardSchemaProvider;