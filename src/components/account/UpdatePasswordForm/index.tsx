import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";


const UpdatePasswordForm = () => {
    const [formData, setFormData] = useState<any>(null);

    const {lang} = useThemeStore();
    const {updatePasswordSchema} = UserSchemaProvider();

    type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<UpdatePasswordForm>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    // 비밀번호 변경 버튼 클릭 시, 유효성 검사 및 confirm 모달 보이기
    const submitHandler:SubmitHandler<UpdatePasswordForm> = (data) => {
        setFormData(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Input
                label={inputCategories.currentPassword[lang]}
                placeholder={placeholderCategories.password[lang]}
                type={"password"}
                id={"password"}
                name={"password"}
                register={register}
                errorMessage={errors.password?.message}
                visibleToggle={true}
            />
            <Input
                label={inputCategories.newPassword[lang]}
                placeholder={placeholderCategories.password[lang]}
                type={"password"}
                id={"newPassword"}
                name={"newPassword"}
                register={register}
                errorMessage={errors.newPassword?.message}
                visibleToggle={true}
            />
            <Input
                label={inputCategories.confirmNewPassword[lang]}
                placeholder={placeholderCategories.password[lang]}
                type={"password"}
                id={"confirmPassword"}
                name={"confirmPassword"}
                register={register}
                errorMessage={errors.confirmPassword?.message}
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
                {buttonCategories.passwordChange[lang]}
            </Button>
        </form>
    );
};

export default UpdatePasswordForm;