import {z} from "zod";
import {EMAIL_REGEX, PW_REGEX, STUDENTID_REGEX, TEL_REGEX} from "@constants/regex.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const UserSchemaProvider = () => {
    const {lang} = useThemeStore();

    const usernameSchema = z
            .string()
            .min(1, messageCategories.inputUsername[lang]);

    const emailSchema = z
            .string()
            .min(1, messageCategories.inputEmail[lang])
            .email(messageCategories.checkEmailForm[lang])
            .regex(EMAIL_REGEX, messageCategories.emailDomain[lang]);

    const passwordSchema = z
            .string()
            .min(8, messageCategories.passwordLength[lang])
            .max(20, messageCategories.passwordLength[lang])
            .regex(PW_REGEX, messageCategories.passwordForm[lang]);

    const confirmPasswordSchema = z
            .string()
            .min(8, messageCategories.confirmPasswordLength[lang])
            .max(20, messageCategories.confirmPasswordLength[lang]);

    const yearSchema = z
            .enum(["1", "2", "3", "4", "5"], {
                required_error: messageCategories.selectYear[lang]
            });

    const studentIdSchema = z
            .string()
            .regex(STUDENTID_REGEX, messageCategories.studentId[lang]);

    const studioSchema = z
            .string()
            .min(1, messageCategories.studio[lang]);

    const telSchema = z
            .string()
            .regex(TEL_REGEX, messageCategories.tel[lang]);

    const labSchema = z
        .string()
        .min(1, messageCategories.lab[lang]);

    const signupSchema = z.object({
        username: usernameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
        year: yearSchema,
        studentId: studentIdSchema,
        studio: studioSchema,
        tel: telSchema,
        code: z
            .string()
            .min(6, messageCategories.codeLength[lang])
            .max(6, messageCategories.codeLength[lang]),
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                code: z.ZodIssueCode.custom,
                message: messageCategories.equalPassword[lang],
            });
        }
    });

    const loginSchema = z.object({
        email: emailSchema,
        password: passwordSchema,
    });

    const updateStudentAccountSchema = z.object({
        username: usernameSchema,
        studentId: studentIdSchema,
        tel: telSchema,
    });

    const updateAssistantAccountSchema = z.object({
        username: usernameSchema,
        studentId: studentIdSchema,
        tel: telSchema,
        lab: labSchema,
    });

    const updatePasswordSchema = z.object({
        password: passwordSchema,
        newPassword: passwordSchema,
        confirmPassword: confirmPasswordSchema,
    }).superRefine((data, ctx) => {
        if (data.newPassword !== data.confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                code: z.ZodIssueCode.custom,
                message: messageCategories.equalPassword[lang],
            });
        }
    });

    const updateYearAndStudioSchema = z.object({
        year: yearSchema,
        studio: studioSchema,
    });

    const findPasswordSchema = z.object({
        username: usernameSchema,
        email: emailSchema,
    });

    return {signupSchema, loginSchema, updateStudentAccountSchema, updateAssistantAccountSchema, updateYearAndStudioSchema, updatePasswordSchema, findPasswordSchema}
};

export default UserSchemaProvider;