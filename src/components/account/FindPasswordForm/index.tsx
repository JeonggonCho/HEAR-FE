import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import useRequest from "@hooks/useRequest.ts";
import findPasswordApi from "@api/auth/findPasswordApi.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const FindPasswordForm = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {findPasswordSchema} = UserSchemaProvider();
    const {sendRequest} = useRequest();

    type FindPasswordForm = z.infer<typeof findPasswordSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FindPasswordForm>({
        resolver: zodResolver(findPasswordSchema),
        defaultValues: {
            username: "",
            email: "",
        },
        mode: "onChange",
    });

    const findPasswordHandler:SubmitHandler<FindPasswordForm> = async (data: any) => {
        try {
            await findPasswordApi({data, sendRequest});
            showToast(messageCategories.findPasswordDone[lang], "success");
            navigate("/login", {replace: true});
        } catch (err) {
            showToast("비밀번호 찾기 요청 중 오류가 발생했습니다.", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit(findPasswordHandler)}>
            <Flex direction={"column"} gap={32} style={{margin: "0 24px"}}>
                <Input
                    label={inputCategories.username[lang]}
                    type={"text"}
                    placeholder={placeholderCategories.username[lang]}
                    name={"username"}
                    id={"username"}
                    register={register}
                    errorMessage={errors.username?.message}
                />
                <Input
                    label={inputCategories.hyuEmail[lang]}
                    type={"text"}
                    placeholder={placeholderCategories.email[lang]}
                    name={"email"}
                    id={"email"}
                    register={register}
                    errorMessage={errors.email?.message}
                />
                <Button
                    type={"submit"}
                    variant={"filled"}
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                    disabled={!isValid}
                >
                    {buttonCategories.findPassword[lang]}
                </Button>
            </Flex>
        </form>
    );
};

export default FindPasswordForm;