import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Flex from "@components/common/Flex";
import Select from "@components/common/Select";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationContext from "@context/EducationContext.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/Modal/style.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const SubmitEducation = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();
    const {updateYearAndStudioSchema} = UserSchemaProvider();
    const {getValues: getEducationAnswers} = useContext(EducationContext);

    const yearCategories = [
        {label: inputCategories.first[lang], value: "1", id: "select-1"},
        {label: inputCategories.second[lang], value: "2", id: "select-2"},
        {label: inputCategories.third[lang], value: "3", id: "select-3"},
        {label: inputCategories.fourth[lang], value: "4", id: "select-4"},
        {label: inputCategories.fifth[lang], value: "5", id: "select-5"},
    ];

    type UpdateYearAndStudioForm = z.infer<typeof updateYearAndStudioSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset
    } = useForm<UpdateYearAndStudioForm>({
        resolver: zodResolver(updateYearAndStudioSchema),
        defaultValues: {
            year: "1",
            studio: "",
        },
        mode: "onChange",
    });

    // 문제 제출하기
    const submitEducation:SubmitHandler<UpdateYearAndStudioForm> = async () => {
        try {
            const response = await sendRequest({
                url: "/education/check",
                method: "post",
                data: {
                    educationAnswers: getEducationAnswers(),
                    year: getValues("year"),
                    studio: getValues("studio"),
                },
            });
            if (response.data) {
                sessionStorage.removeItem("educationAnswers");
                navigate("/education/end", {replace: true});
            }
        } catch (err) {
            console.error("문제 제출 중 에러 발생: ", err);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"fit"}
                    color={"primary"}
                    size={"sm"}
                    onClick={() => setShowModal(true)}
                >
                    {buttonCategories.submit[lang]}
                </Button>
            }
            header={<h4 css={confirmModalHeader}>{cardCategories.submit[lang]}</h4>}
            subMessage={<p css={confirmModalSubMessage}>{messageCategories.warningSubmit[lang]}</p>}
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"third"}
                    size={"md"}
                    width={"full"}
                    onClick={() => {
                        reset({
                            year: "1",
                            studio: "",
                        });
                        setShowModal(false);
                    }}
                >
                    {buttonCategories.cancel[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"submit"}
                    variant={"filled"}
                    size={"md"}
                    color={"approval"}
                    width={"full"}
                    onClick={handleSubmit(submitEducation)}
                >
                    {buttonCategories.submit[lang]}
                </Button>
            }
        >
            <Flex
                direction={"column"}
                gap={32}
                style={{margin: "32px 0"}}
            >
                <Select
                    categories={yearCategories}
                    label={inputCategories.year[lang]}
                    name={"year"}
                    register={register}
                    errorMessage={errors.year?.message}
                    type={"radio"}
                />
                <Input
                    label={inputCategories.studio[lang]}
                    subLabel={inputCategories.inputKorean[lang]}
                    type={"text"}
                    id={"studio"}
                    name={"studio"}
                    placeholder={placeholderCategories.studio[lang]}
                    register={register}
                    errorMessage={errors.studio?.message}
                />
            </Flex>
        </ConfirmModal>
    );
};

export default SubmitEducation;