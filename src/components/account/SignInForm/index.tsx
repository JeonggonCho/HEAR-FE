import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuth from "@hooks/useAuth.ts";
import useRequest from "@hooks/useRequest.ts";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import LoadingLoop from "@components/common/LoadingLoop";
import signInApi from "@api/auth/signInApi.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const SignInForm = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {loginSchema} = UserSchemaProvider();
    const {login} = useAuth();
    const {isLoading, sendRequest} = useRequest({loadingTime: 2000});

    type LoginFormData = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    // 로그인 요청
    const submitHandler: SubmitHandler<LoginFormData> = async (data) => {
        const responseData = await signInApi({data, sendRequest});
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
            refreshToken,
            lab
        } = responseData;
        login(accessToken, refreshToken);
        setUserInfo({userId, email, username, studentId});
        setUserData({year, studio, passEducation, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab});
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Flex direction={"column"} gap={32} style={{margin: "0 24px"}}>
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
                    <Flex align={"center"} justify={"center"} gap={12}>
                        {buttonCategories.signIn[lang]}
                        {isLoading &&
                          <LoadingLoop size={24} background={false} thickness={3} ringColor={"white"}/>
                        }
                    </Flex>
                </Button>
            </Flex>
        </form>
    );
};

export default SignInForm;