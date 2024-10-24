import {z} from "zod";
import {EMAIL_REGEX, PW_REGEX, STUDENTID_REGEX, TEL_REGEX} from "@constants/regex.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";

const UserSchemaProvider = () => {
    const {lang} = useThemeStore();

    const signupSchema = z.object({
        username: z
            .string()
            .min(1, messageCategories.inputUsername[lang]),
        email: z
            .string()
            .min(1, messageCategories.inputEmail[lang])
            .email(messageCategories.checkEmailForm[lang])
            .regex(EMAIL_REGEX, messageCategories.emailDomain[lang]),
        password: z
            .string()
            .min(8, messageCategories.passwordLength[lang])
            .max(20, messageCategories.passwordLength[lang])
            .regex(PW_REGEX, messageCategories.passwordForm[lang]),
        confirmPassword: z
            .string()
            .min(8, messageCategories.confirmPasswordLength[lang])
            .max(20, messageCategories.confirmPasswordLength[lang]),
        year: z
            .enum(["1", "2", "3", "4", "5"], {
                required_error: messageCategories.selectYear[lang]
            }),
        studentId: z
            .string()
            .regex(STUDENTID_REGEX, messageCategories.studentId[lang]),
        studio: z
            .string()
            .min(1, messageCategories.studio[lang]),
        tel: z
            .string()
            .regex(TEL_REGEX, messageCategories.tel[lang]),
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path:["confirmPassword"],
                code: z.ZodIssueCode.custom,
                message: messageCategories.equalPassword[lang],
            });
        }
    });

    const loginSchema = z.object({
        email: z
            .string()
            .min(1, messageCategories.inputEmail[lang])
            .email(messageCategories.checkEmailForm[lang])
            .regex(EMAIL_REGEX, messageCategories.emailDomain[lang]),
        password: z
            .string()
            .min(8, messageCategories.passwordLength[lang])
            .max(20, messageCategories.passwordLength[lang])
            .regex(PW_REGEX, messageCategories.passwordForm[lang]),
    });

    const updateAccountSchema = z.object({
        username: z
            .string()
            .min(1, messageCategories.inputUsername[lang]),
        year: z
            .enum(["1", "2", "3", "4", "5"], {
                required_error: messageCategories.selectYear[lang]
            }),
        studentId: z
            .string()
            .regex(STUDENTID_REGEX, messageCategories.studentId[lang]),
        studio: z
            .string()
            .min(1, messageCategories.studio[lang]),
        tel: z
            .string()
            .regex(TEL_REGEX, messageCategories.tel[lang]),
    });

    const findPasswordSchema = z.object({
        username: z
            .string()
            .min(1, messageCategories.inputUsername[lang]),
        email: z
            .string()
            .min(1, messageCategories.inputEmail[lang])
            .email(messageCategories.checkEmailForm[lang])
            .regex(EMAIL_REGEX, messageCategories.emailDomain[lang]),
        studentId: z
            .string()
            .regex(STUDENTID_REGEX, messageCategories.studentId[lang]),
    });

    return {signupSchema, loginSchema, updateAccountSchema, findPasswordSchema}
};

export default UserSchemaProvider;