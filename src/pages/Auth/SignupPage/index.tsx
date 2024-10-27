import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {AxiosResponse} from "axios";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Select from "@components/common/Select";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Link from "@components/common/Link";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import HeadTag from "@components/common/HeadTag";
import InputMessage from "@components/common/InputMessage";
import Timer from "@components/common/Timer";

import useRequest from "@hooks/useRequest.ts";
import useDebounce from "@hooks/useDebounce.ts";
import isEmailValid from "@util/isEmailValid.ts";
import isNumber from "@util/isNumber.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {IAuthResponseData} from "@/types/authResponse.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {
    ChangeAndResendBtnsWrapper,
    Container,
    EmailFormWrapper,
    EmailInputWrapper,
    VerificationCodeInputWrapper,
} from "./style.ts";


const SignupPage:FC = () => {
    const [email, setEmail] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [resetTrigger, setResetTrigger] = useState<number>(0);
    const [fixEmail, setFixEmail] = useState<boolean>(false);
    const [sameEmailError, setSameEmailError] = useState<boolean>(false);
    const [validEmailMessage, setValidEmailMessage] = useState<boolean>(false);
    const [disabledVerificationBtn, setDisabledVerificationBtn] = useState<boolean>(true);
    const [sendVerificationCodeMode, setSendVerificationCodeMode] = useState<boolean>(false);
    const [disabledConfirmBtn, setDisabledConfirmBtn] = useState<boolean>(true);
    const [sendCodeMessage, setSendCodeMessage] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [verifiedMessage, setVerifiedMessage] = useState<boolean>(false);

    const navigate = useNavigate();

    const {login} = useAuthStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {signupSchema} = UserSchemaProvider();

    const yearCategories = [
        {label: inputCategories.first[lang], value: "1", id: "select-1"},
        {label: inputCategories.second[lang], value: "2", id: "select-2"},
        {label: inputCategories.third[lang], value: "3", id: "select-3"},
        {label: inputCategories.fourth[lang], value: "4", id: "select-4"},
        {label: inputCategories.fifth[lang], value: "5", id: "select-5"},
    ];

    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {sendRequest: checkEmailSendRequest} = useRequest();
    const {
        sendRequest: sendVerificationCodeSendRequest,
        errorText: sendVerificationCodeErrorText,
        clearError: sendVerificationCodeClearError,
    } = useRequest();

    const {
        sendRequest: verifyEmailCodeSendRequest,
        errorText: verifyEmailCodeErrorText,
        clearError: verifyEmailCodeClearError,
    } = useRequest();

    type SignupFormData = z.infer<typeof signupSchema>;

    const {register, handleSubmit, formState:{errors}, clearErrors} = useForm<SignupFormData>({
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
        }
    });

    // 이메일 디바운스 적용하기
    const debouncedEmail = useDebounce(email, 1000);

    // 동일한 이메일이 있는지 확인 요청 보내기
    const checkSameEmail = useCallback(async () => {
        if (!debouncedEmail || !isEmailValid(debouncedEmail)) {
            setDisabledVerificationBtn(true);
            return;
        }
        try {
            const response = await checkEmailSendRequest({
                url: `/users/check-email?email=${debouncedEmail}`,
            });
            if (response.data !== 200) {
                setDisabledVerificationBtn(true);
                setSameEmailError(true);
                setValidEmailMessage(false);
            } else {
                setDisabledVerificationBtn(false);
                setSameEmailError(false);
                setValidEmailMessage(true);
            }
        } catch (err) {
            console.error("동일한 이메일 존재하는지 확인 중 에러 발생: ", err);
            setDisabledVerificationBtn(true);
        }
    }, [checkEmailSendRequest, debouncedEmail]);

    // 디바운스 될 때, 이메일 유효성 함수 호출
    useEffect(() => {
        checkSameEmail();
    }, [checkSameEmail]);


    // 인증 번호 전송하기
    const sendVerificationCode = async () => {
        setVerificationCode("");
        try {
            const response = await sendVerificationCodeSendRequest({
                url: "/users/send-verification-code",
                method: "post",
                data: {email: debouncedEmail},
            });
            if (response.data) {
                setIsVerified(false);
                setSendVerificationCodeMode(true);
                setFixEmail(true);
                setValidEmailMessage(false);
                setSendCodeMessage(true);
                setVerificationCode("");
                setResetTrigger(prevState => prevState + 1);
                setDisabledConfirmBtn(true);
            }
        } catch (err) {
            console.error("인증 번호 요청 중 에러 발생: ", err);
        }
    };

    // 인증 번호 전송 요청 클릭
    const sendVerificationCodeClickHandler = () => {
        if (isEmailValid(email)) {
            sendVerificationCode();
        }
    };

    // 인증 번호 확인하기
    const verifyEmailCode = useCallback(async () => {
        try {
            const response = await verifyEmailCodeSendRequest({
                url: "/users/verify-email-code",
                method: "post",
                data: { email: email, code: verificationCode },
            });
            if (response.data) {
                setIsVerified(true);
                setVerifiedMessage(true);
                setSendVerificationCodeMode(false);
            }
        } catch (err) {
            console.error("인증 번호 확인 중 에러 발생: ", err);
        }
    }, [verifyEmailCodeSendRequest, email, verificationCode]);


    // 인증 번호 확인 요청 클릭
    const verifyEmailCodeClickHandler = () => {
        if (verificationCode.length === 6 && isNumber(verificationCode)) {
            verifyEmailCode();
        }
    };

    // 이메일 리셋
    const emailResetHandler = () => {
        setFixEmail(false);
        setEmail("");
        setVerificationCode("");
        setSendVerificationCodeMode(false);
        setIsVerified(false);
        setDisabledConfirmBtn(true);
    };


    // 회원가입 요청하기
    const submitHandler: SubmitHandler<SignupFormData> = async (data) => {
        try {
            const response: AxiosResponse<IAuthResponseData> = await sendRequest({
                url: "/users/signup",
                method: "post",
                data: data,
            });
            const {userId, email, username, studentId, year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, accessToken, refreshToken} = response.data;

            login(accessToken, refreshToken);
            setUserInfo({userId, email, username, studentId});
            setUserData({year, studio, passQuiz, countOfLaserPerDay, countOfLaserPerWeek, countOfWarning, tel, role});

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

            // 인증 코드가 6자리 숫자인지 확인
            if (value.length === 6 && isNumber(value)) {
                setDisabledConfirmBtn(false);
            } else {
                setDisabledConfirmBtn(true);
            }
        }
    };

    return (
        <Container>
            <HeadTag title={headerCategories.signUp[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.signUp[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
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

                        <EmailFormWrapper>
                            <EmailInputWrapper sendVerificationCodeMode={sendVerificationCodeMode}>
                                <Input
                                    label={inputCategories.hyuEmail[lang]}
                                    type={"text"}
                                    placeholder={placeholderCategories.email[lang]}
                                    id={"email"}
                                    name={"email"}
                                    register={register}
                                    errorMessage={errors.email?.message}
                                    value={email}
                                    onChange={inputChangeHandler}
                                    disabled={fixEmail}
                                />

                                {isVerified ? (
                                    <Button
                                        type="button"
                                        content={buttonCategories.changing[lang]}
                                        width="fit"
                                        color="second"
                                        scale="small"
                                        onClick={emailResetHandler}
                                    />
                                ) : (
                                    <>
                                        {!sendVerificationCodeMode ? (
                                            <Button
                                                type="button"
                                                content={buttonCategories.verification[lang]}
                                                width="fit"
                                                color="approval"
                                                scale="small"
                                                disabled={disabledVerificationBtn}
                                                onClick={sendVerificationCodeClickHandler}
                                            />
                                        ) : (
                                            <ChangeAndResendBtnsWrapper sendVerificationCodeMode={sendVerificationCodeMode}>
                                                <Button
                                                    type="button"
                                                    content={buttonCategories.changing[lang]}
                                                    width="fit"
                                                    color="second"
                                                    scale="small"
                                                    onClick={emailResetHandler}
                                                />
                                                <Button
                                                    type="button"
                                                    content={buttonCategories.resend[lang]}
                                                    width="fit"
                                                    color="approval"
                                                    scale="small"
                                                    onClick={sendVerificationCodeClickHandler}
                                                />
                                            </ChangeAndResendBtnsWrapper>
                                        )}
                                    </>
                                )}
                            </EmailInputWrapper>

                            {sameEmailError && isEmailValid(debouncedEmail) && <InputMessage message={messageCategories.sameEmailError[lang]} type={"error"}/>}
                            {validEmailMessage && isEmailValid(debouncedEmail) && <InputMessage message={messageCategories.validEmail[lang]} type={"approval"}/>}

                            {!isVerified && sendVerificationCodeMode &&
                              <VerificationCodeInputWrapper>
                                <Timer resetTrigger={resetTrigger} defaultTime={180} action={emailResetHandler}/>
                                <Input
                                  label={inputCategories.verificationCode[lang]}
                                  type={"text"}
                                  id={"code"}
                                  name={"code"}
                                  value={verificationCode}
                                  placeholder={"⋆⋆⋆⋆⋆⋆"}
                                  register={register}
                                  errorMessage={errors.code?.message}
                                  onChange={inputChangeHandler}
                                  maxLength={6}
                                />
                                <Button
                                  type={"button"}
                                  content={buttonCategories.confirm[lang]}
                                  width={"fit"}
                                  color={"approval"}
                                  scale={"small"}
                                  disabled={disabledConfirmBtn}
                                  onClick={verifyEmailCodeClickHandler}
                                />
                              </VerificationCodeInputWrapper>
                            }
                        </EmailFormWrapper>

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
                            content={buttonCategories.signUp[lang]}
                            width={"full"}
                            color={"primary"}
                            scale={"big"}
                        />
                    </form>
                    <Link
                        type={"text"}
                        name={buttonCategories.signIn[lang]}
                        to={"/login"}
                        color={"primary"}
                    />
                </>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }

            {sendVerificationCodeErrorText &&
                <Toast text={sendVerificationCodeErrorText} setToast={sendVerificationCodeClearError} type={"error"}/>
            }

            {verifyEmailCodeErrorText &&
                <Toast text={verifyEmailCodeErrorText} setToast={verifyEmailCodeClearError} type={"error"}/>
            }

            {sendCodeMessage &&
                <Toast text={messageCategories.sendVerificationCode[lang]} setToast={() => setSendCodeMessage(false)} type={"success"}/>
            }

            {verifiedMessage &&
                <Toast text={messageCategories.verifiedCode[lang]} setToast={() => setVerifiedMessage(false)} type={"success"}/>
            }
        </Container>
    );
};

export default SignupPage;