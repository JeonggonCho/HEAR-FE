import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const SignInForm = () => {
    const {lang} = useThemeStore();
    const {loginSchema} = UserSchemaProvider();

    type LoginFormData = z.infer<typeof loginSchema>;

    const {register, handleSubmit, formState:{errors, isValid}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    // 로그인 요청
    // const submitHandler: SubmitHandler<LoginFormData> = async (data) => {
    //     try {
    //         const response:AxiosResponse<IAuthResponseData> = await sendRequest({
    //             url: "/users/login",
    //             method: "post",
    //             data: data
    //         });
    //         const {userId, email, username, studentId, year, studio, passEducation, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, accessToken, refreshToken, lab} = response.data;
    //         login(accessToken, refreshToken);
    //         setUserInfo({userId, email, username, studentId});
    //         setUserData({year, studio, passEducation, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab});
    //
    //         navigate("/");
    //     } catch (err) {
    //         console.log("로그인 실패: ", err);
    //     }
    // };

    const submitHandler: SubmitHandler<LoginFormData> = async () => {
        return;
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Input
                label={inputCategories.hyuEmail[lang]}
                type={"text"}
                placeholder={placeholderCategories.email[lang]}
                id={"email"}
                name={"email"}
                register={register}
                errorMessage={errors.email?.message}
            />
            <Input
                label={inputCategories.password[lang]}
                type={"password"}
                placeholder={placeholderCategories.password[lang]}
                id={"password"}
                name={"password"}
                register={register}
                errorMessage={errors.password?.message}
                visibleToggle={true}
            />
            <Button
                type={"submit"}
                variant={"filled"}
                width={"full"}
                color={"primary"}
                size={"lg"}
                disabled={!isValid}
            >
                {buttonCategories.signIn[lang]}
            </Button>
        </form>
    );
};

export default SignInForm;