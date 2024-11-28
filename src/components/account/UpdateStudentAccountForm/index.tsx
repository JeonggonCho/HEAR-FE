import {createContext, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import UpdateAccount from "@components/account/UpdateAccount";
import Flex from "@components/common/Flex";
import userSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const UpdateStudentContext = createContext<{ formData: any; isValid: boolean }>({ formData: null, isValid: false });


const UpdateStudentAccountForm = () => {
    const [formData, setFormData] = useState<any>(null);

    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {updateStudentAccountSchema} = userSchemaProvider();

    type UpdateStudentAccountFormData = z.infer<typeof updateStudentAccountSchema>;

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<UpdateStudentAccountFormData>({
        resolver: zodResolver(updateStudentAccountSchema),
        defaultValues: {
            username: "",
            studentId: "",
            tel: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (userInfo && userData) {
            reset({
                username: userInfo.username,
                studentId: userInfo.studentId,
                tel: userData.tel,
            });
        }
    }, [userInfo, userData]);

    const submitHandler: SubmitHandler<UpdateStudentAccountFormData> = (data) => {
        setFormData(data);
    };

    return (
        <UpdateStudentContext.Provider value={{formData, isValid}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={32} style={{margin: "0 24px"}}>
                    <Input
                        label={inputCategories.username[lang]}
                        type={"text"}
                        placeholder={placeholderCategories.username[lang]}
                        id={"username"}
                        name={"username"}
                        register={register}
                        errorMessage={errors.username?.message}
                    />
                    <Input
                        label={inputCategories.studentId[lang]}
                        type={"number"}
                        placeholder={placeholderCategories.studentId[lang]}
                        id={"student-id"}
                        name={"studentId"}
                        register={register}
                        errorMessage={errors.studentId?.message}
                    />
                    <Input
                        label={inputCategories.tel[lang]}
                        type={"tel"}
                        placeholder={placeholderCategories.tel[lang]}
                        id={"tel"}
                        name={"tel"}
                        register={register}
                        errorMessage={errors.tel?.message}
                    />
                    <UpdateAccount/>
                </Flex>
            </form>
        </UpdateStudentContext.Provider>
    );
};

export {UpdateStudentAccountForm, UpdateStudentContext};