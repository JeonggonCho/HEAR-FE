import {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import InputMessage from "@components/common/InputMessage";
import Timer from "@components/common/Timer";
import useRequest from "@hooks/useRequest.ts";
import useDebounce from "@hooks/useDebounce.ts";
import isEmailValid from "@util/isEmailValid.ts";
import isNumber from "@util/isNumber.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {ChangeAndResendBtnsWrapper, Container, EmailInputWrapper, VerificationCodeInputWrapper} from "./style.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";


interface IEmailVerificationProps<T extends FieldValues> {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    verificationCode: string;
    setVerificationCode: Dispatch<SetStateAction<string>>;
    inputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    register: UseFormRegister<T>;
    emailErrorMessage?: string;
    verificationCodeErrorMessage?: string;
}


const EmailVerification = <T extends FieldValues>(
    {
        email,
        setEmail,
        verificationCode,
        setVerificationCode,
        inputChangeHandler,
        register,
        emailErrorMessage,
        verificationCodeErrorMessage}: IEmailVerificationProps<T>
) => {
    const [resetTrigger, setResetTrigger] = useState<number>(0);
    const [fixEmail, setFixEmail] = useState<boolean>(false);
    const [sameEmailError, setSameEmailError] = useState<boolean>(false);
    const [validEmailMessage, setValidEmailMessage] = useState<boolean>(false);
    const [sendCodeMessage, setSendCodeMessage] = useState<boolean>(false);
    const [verifiedMessage, setVerifiedMessage] = useState<boolean>(false);
    const [sendVerificationCodeMode, setSendVerificationCodeMode] = useState<boolean>(false);
    const [disabledVerificationBtn, setDisabledVerificationBtn] = useState<boolean>(true);
    const [disabledConfirmBtn, setDisabledConfirmBtn] = useState<boolean>(true);
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {sendRequest} = useRequest();

    // 이메일 디바운스 적용하기
    const debouncedEmail = useDebounce(email, 1000);

    // 동일한 이메일이 있는지 확인 요청 보내기
    const checkSameEmail = useCallback(async () => {
        if (!debouncedEmail || !isEmailValid(debouncedEmail)) {
            setDisabledVerificationBtn(true);
            return;
        }
        try {
            const response = await sendRequest({
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
    }, [sendRequest, debouncedEmail]);

    // 디바운스 될 때, 이메일 유효성 함수 호출
    useEffect(() => {
        checkSameEmail();
    }, [checkSameEmail]);

    // 인증 번호 전송하기
    const sendVerificationCode = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users/send-verification-code",
                method: "post",
                data: {email: debouncedEmail},
            });
            if (response.data) {
                setVerificationCode("");
                setIsVerified(false);
                setSendVerificationCodeMode(true);
                setFixEmail(true);
                setValidEmailMessage(false);
                setSendCodeMessage(true);
                setResetTrigger(prevState => prevState + 1);
                setDisabledConfirmBtn(true);
            }
        } catch (err) {
            console.error("인증 번호 요청 중 에러 발생: ", err);
        }
    }, [sendRequest, debouncedEmail]);

    // 인증 번호 전송 요청 클릭
    const sendVerificationCodeClickHandler = () => {
        if (isEmailValid(email)) {
            sendVerificationCode();
        }
    };

    // 인증 번호 확인하기
    const verifyEmailCode = useCallback(async () => {
        try {
            const response = await sendRequest({
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
    }, [sendRequest, email, verificationCode]);

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

    // 인증 번호가 6자리 숫자인지 확인
    useEffect(() => {
        if (verificationCode.length === 6 && isNumber(verificationCode)) {
            setDisabledConfirmBtn(false);
        } else {
            setDisabledConfirmBtn(true);
        }
    }, [verificationCode]);

    // 인증 번호 전송 성공 메시지
    useEffect(() => {
        if (sendCodeMessage) showToast(messageCategories.sendVerificationCode[lang], "success");
        const errorTimer = setTimeout(() => setSendCodeMessage(false), 6000);
        return () => clearTimeout(errorTimer);
    }, [sendCodeMessage]);

    // 인증 번호 확인 메시지
    useEffect(() => {
        if (verifiedMessage) showToast(messageCategories.verifiedCode[lang], "success");
        const errorTimer = setTimeout(() => setVerifiedMessage(false), 6000);
        return () => clearTimeout(errorTimer);
    }, [verifiedMessage]);

    return (
        <Container>
            <EmailInputWrapper sendVerificationCodeMode={sendVerificationCodeMode}>
                <Input
                    label={inputCategories.hyuEmail[lang]}
                    placeholder={placeholderCategories.email[lang]}
                    type={"text"}
                    id={"email"}
                    name={"email" as FieldPath<T>}
                    register={register}
                    errorMessage={emailErrorMessage}
                    value={email}
                    onChange={inputChangeHandler}
                    disabled={fixEmail}
                />

                {isVerified ?
                    <Button
                        type={"button"}
                        variant={"filled"}
                        width={"fit"}
                        color={"second"}
                        size={"sm"}
                        onClick={emailResetHandler}
                    >
                        {buttonCategories.changing[lang]}
                    </Button>
                    :
                    <>
                        {!sendVerificationCodeMode ?
                            <Button
                              type={"button"}
                              variant={"filled"}
                              width={"fit"}
                              color={"approval"}
                              size={"sm"}
                              disabled={disabledVerificationBtn}
                              onClick={sendVerificationCodeClickHandler}
                            >
                                {buttonCategories.verification[lang]}
                            </Button>
                            :
                            <ChangeAndResendBtnsWrapper sendVerificationCodeMode={sendVerificationCodeMode}>
                                <Button
                                    type={"button"}
                                    variant={"filled"}
                                    width={"fit"}
                                    color={"second"}
                                    size={"sm"}
                                    onClick={emailResetHandler}
                                >
                                    {buttonCategories.changing[lang]}
                                </Button>
                                <Button
                                    type={"button"}
                                    variant={"filled"}
                                    width={"fit"}
                                    color={"approval"}
                                    size={"sm"}
                                    onClick={sendVerificationCodeClickHandler}
                                >
                                    {buttonCategories.resend[lang]}
                                </Button>
                            </ChangeAndResendBtnsWrapper>
                        }
                    </>
                }
            </EmailInputWrapper>

            {sameEmailError && isEmailValid(debouncedEmail) && <InputMessage message={messageCategories.sameEmailError[lang]} type={"error"}/>}
            {validEmailMessage && isEmailValid(debouncedEmail) && <InputMessage message={messageCategories.validEmail[lang]} type={"approval"}/>}

            {!isVerified && sendVerificationCodeMode &&
                <VerificationCodeInputWrapper lang={lang}>
                    <Timer defaultTime={180} action={emailResetHandler} resetTrigger={resetTrigger}/>
                    <Input
                      label={inputCategories.verificationCode[lang]}
                      placeholder={"⋆⋆⋆⋆⋆⋆"}
                      type={"text"}
                      id={"code"}
                      name={"code" as FieldPath<T>}
                      value={verificationCode}
                      register={register}
                      errorMessage={verificationCodeErrorMessage}
                      onChange={inputChangeHandler}
                      maxLength={6}
                    />
                    <Button
                      type={"button"}
                      variant={"filled"}
                      width={"fit"}
                      color={"approval"}
                      size={"sm"}
                      disabled={disabledConfirmBtn}
                      onClick={verifyEmailCodeClickHandler}
                    >
                        {buttonCategories.confirm[lang]}
                    </Button>
                </VerificationCodeInputWrapper>
            }
        </Container>
    );
};

export default EmailVerification;