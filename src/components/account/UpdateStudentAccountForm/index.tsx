import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import userSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


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
        <form onSubmit={handleSubmit(submitHandler)}>
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
            <Button
                type={"submit"}
                variant={"filled"}
                width={"full"}
                color={"primary"}
                size={"lg"}
                disabled={!isValid}
            >
                {buttonCategories.profileUpdate[lang]}
            </Button>
        </form>
    );
};

export default UpdateStudentAccountForm;