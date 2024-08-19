import {z} from "zod";
import {EMAIL_REGEX, PW_REGEX} from "@constants/authRegex.ts";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "이메일을 입력해주세요")
        .email("이메일 주소를 확인해주세요")
        .regex(EMAIL_REGEX, "이메일은 '@hanyang.ac.kr' 만 사용이 가능합니다"),
    password: z
        .string()
        .min(8, "비밀번호는 8자 이상 20자 이하로 입력해주세요")
        .max(20, "비밀번호는 8자 이상 20자 이하로 입력해주세요")
        .regex(PW_REGEX, "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합으로 입력해주세요"),
});