import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import EmailVerification from "@components/common/EmailVerification";
import Flex from "@components/common/Flex";
import Select from "@components/common/Select";
import signUpApi from "@api/auth/signUpApi.ts";
import useRequest from "@hooks/useRequest.ts";
import useAuth from "@hooks/useAuth.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const SignUpForm = () => {
    const [email, setEmail] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>("");

    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {signupSchema} = UserSchemaProvider();
    const {sendRequest} = useRequest();
    const {login} = useAuth();

    const yearCategories = [
        {label: inputCategories.first[lang], value: "1", id: "select-1"},
        {label: inputCategories.second[lang], value: "2", id: "select-2"},
        {label: inputCategories.third[lang], value: "3", id: "select-3"},
        {label: inputCategories.fourth[lang], value: "4", id: "select-4"},
        {label: inputCategories.fifth[lang], value: "5", id: "select-5"},
    ];

    type SignupFormData = z.infer<typeof signupSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        clearErrors
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            year: "1",
            studentId: "",
            studio: "",
            tel: "",
            code: "",
        },
        mode: "onChange",
    });

    const signUpHandler: SubmitHandler<SignupFormData> = async (data) => {
        try {
            const responseData = await signUpApi({data, sendRequest});
            const {
                userId,
                email,
                username,
                studentId,
                year,
                studio,
                passEducation,
                countOfLaserPerWeek,
                countOfLaserPerDay,
                countOfWarning,
                tel,
                role,
                accessToken,
                refreshToken
            } = responseData;

            login(accessToken, refreshToken);
            setUserInfo({userId, email, username, studentId});
            setUserData({year, studio, passEducation, countOfLaserPerDay, countOfLaserPerWeek, countOfWarning, tel, role});
            navigate("/signup/done", { replace: true });
        } catch (err) {
            console.error("회원가입 실패: ", err);
        }
    };


    // 입력 필드에 입력이 있을 경우, 오류 메시지 숨기기
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        clearErrors(name as keyof SignupFormData);

        if (name === "email") {
            setEmail(value);
        } else if (name === "code") {
            setVerificationCode(value);
        }
    };

    return (
        <form onSubmit={handleSubmit(signUpHandler)}>
            <Flex direction={"column"} gap={32} style={{margin: "0 24px"}}>
                <Input
                    label={inputCategories.username[lang]}
                    type={"text"}
                    placeholder={placeholderCategories.username[lang]}
                    id={"username"}
                    name={"username"}
                    register={register}
                    errorMessage={errors.username?.message}
                    onChange={inputChangeHandler}
                />
                <EmailVerification
                    email={email}
                    setEmail={setEmail}
                    verificationCode={verificationCode}
                    setVerificationCode={setVerificationCode}
                    inputChangeHandler={inputChangeHandler}
                    register={register}
                    emailErrorMessage={errors.email?.message}
                    verificationCodeErrorMessage={errors.code?.message}
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
                    onChange={inputChangeHandler}
                />
                <Input
                    label={inputCategories.confirmPassword[lang]}
                    type={"password"}
                    placeholder={placeholderCategories.confirmPassword[lang]}
                    id={"confirm-password"}
                    name={"confirmPassword"}
                    register={register}
                    errorMessage={errors.confirmPassword?.message}
                    visibleToggle={true}
                    onChange={inputChangeHandler}
                />
                <Select
                    label={inputCategories.year[lang]}
                    categories={yearCategories}
                    name={"year"}
                    register={register}
                    errorMessage={errors.year?.message}
                    type={"radio"}
                />
                <Input
                    label={inputCategories.studentId[lang]}
                    type={"number"}
                    placeholder={placeholderCategories.studentId[lang]}
                    id={"student-id"}
                    name={"studentId"}
                    register={register}
                    errorMessage={errors.studentId?.message}
                    onChange={inputChangeHandler}
                />
                <Input
                    label={inputCategories.studio[lang]}
                    subLabel={inputCategories.inputKorean[lang]}
                    type={"text"}
                    placeholder={placeholderCategories.studio[lang]}
                    id={"studio"}
                    name={"studio"}
                    register={register}
                    errorMessage={errors.studio?.message}
                    onChange={inputChangeHandler}
                />
                <Input
                    label={inputCategories.tel[lang]}
                    type={"tel"}
                    placeholder={placeholderCategories.tel[lang]}
                    id={"tel"}
                    name={"tel"}
                    register={register}
                    errorMessage={errors.tel?.message}
                    onChange={inputChangeHandler}
                />
                <Button
                    type={"submit"}
                    variant={"filled"}
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                    disabled={!isValid}
                >
                    {buttonCategories.signUp[lang]}
                </Button>
            </Flex>
        </form>
    );
};

export default SignUpForm;