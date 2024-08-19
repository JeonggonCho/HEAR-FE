import {z} from "zod";
import {TEL_REGEX} from "@constants/authRegex.ts";

export const updateAccountSchema = z.object({
    year: z
        .string()
        .min(1, "학년을 선택해주세요"),
    studio: z
        .string()
        .min(1, "스튜디오 교수님을 입력해주세요"),
    tel: z
        .string()
        .regex(TEL_REGEX, "전화번호를 확인해주세요"),
});