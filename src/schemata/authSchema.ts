import {z} from "zod";
import {EMAIL_REGEX, PW_REGEX, STUDENTID_REGEX, TEL_REGEX} from "@constants/regex.ts";

export const signupSchema = z.object({
    username: z
        .string()
        .min(1, "이름을 입력해주세요"),
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
    confirmPassword: z
        .string()
        .min(8, "비밀번호 확인은 8자 이상 20자 이하로 입력해주세요")
        .max(20, "비밀번호 확인은 8자 이상 20자 이하로 입력해주세요"),
    year: z
        .enum(["1", "2", "3", "4", "5"], {
            required_error: "학년을 선택해주세요"
        }),
    studentId: z
        .string()
        .regex(STUDENTID_REGEX, "학번은 10자리의 숫자여야 합니다"),
    studio: z
        .string()
        .min(1, "스튜디오 교수님을 입력해주세요"),
    tel: z
        .string()
        .regex(TEL_REGEX, "전화번호를 확인해주세요"),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path:["confirmPassword"],
            code: z.ZodIssueCode.custom,
            message: "비밀번호가 일치하지 않습니다",
        });
    }
});

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

export const updateAccountSchema = z.object({
    username: z
        .string()
        .min(1, "이름을 입력해주세요"),
    year: z
        .enum(["1", "2", "3", "4", "5"], {
            required_error: "학년을 선택해주세요"
        }),
    studentId: z
        .string()
        .regex(STUDENTID_REGEX, "학번은 10자리의 숫자여야 합니다"),
    studio: z
        .string()
        .min(1, "스튜디오 교수님을 입력해주세요"),
    tel: z
        .string()
        .regex(TEL_REGEX, "전화번호를 확인해주세요"),
});

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