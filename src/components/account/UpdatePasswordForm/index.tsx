import {createContext, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Flex from "@components/common/Flex";
import UpdatePassword from "@components/account/UpdatePassword";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const UpdatePasswordContext = createContext<{ formData: any; isValid: boolean }>({
    formData: null,
    isValid: false
});


const UpdatePasswordForm = () => {
    const [formData, setFormData] = useState<any>(null);

    const {lang} = useThemeStore();
    const {updatePasswordSchema} = UserSchemaProvider();

    type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<UpdatePasswordForm>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const submitHandler:SubmitHandler<UpdatePasswordForm> = (data) => {
        setFormData(data);
    };

    return (
        <UpdatePasswordContext.Provider value={{formData, isValid}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={32} style={{margin: "0 24px"}}>
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
                    <UpdatePassword/>
                </Flex>
            </form>
        </UpdatePasswordContext.Provider>
    );
};

export {UpdatePasswordForm, UpdatePasswordContext};