import {z} from "zod";
import {EMAIL_REGEX, STUDENTID_REGEX} from "@constants/authRegex.ts";

export const findPasswordSchema = z.object({
    username: z
        .string()
        .min(1, "이름을 입력해주세요"),
    email: z
        .string()
        .min(1, "이메일을 입력해주세요")
        .email("이메일 주소를 확인해주세요")
        .regex(EMAIL_REGEX, "이메일은 '@hanyang.ac.kr' 만 사용이 가능합니다"),
    studentId: z
        .string()
        .regex(STUDENTID_REGEX, "학번은 10자리의 숫자여야 합니다"),
});