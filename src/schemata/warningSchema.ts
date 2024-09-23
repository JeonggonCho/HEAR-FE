import {z} from "zod";

export const warningSchema = z.object({
    message: z
        .string()
        .min(1, "경고 사유를 작성해주세요"),
});