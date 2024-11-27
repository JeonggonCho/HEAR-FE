import {ChangeEvent, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Select from "@components/common/Select";
import Button from "@components/common/Button";
import Textarea from "@components/common/Textarea";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";


const CreateInquiryPage = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {text, handleTextChange, countOfText} = useTextarea();
    const {inquirySchema} = BoardSchemaProvider();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const inquiryInfoCategories = [
        {label: inquiryCategories.machine[lang], value: "machine", id: "radio-1"},
        {label: inquiryCategories.reservation[lang], value: "reservation", id: "radio-2"},
        {label: inquiryCategories.room[lang], value: "room", id: "radio-3"},
        {label: inquiryCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

    type InquiryFormData = z.infer<typeof inquirySchema>;

    const {register, handleSubmit, setValue, formState:{errors}} = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            title: "",
            category: "machine",
            content: "",
        }
    })

    // 문의 생성 핸들러
    const submitHandler: SubmitHandler<InquiryFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/inquiries/new",
                method: "post",
                data: data,
            });
            const {inquiryId} = response.data;
            navigate(`/board/inquiry/${inquiryId}`, { replace: true });
        } catch (err) {
            console.error("문의 생성 시 에러 발생: ", err);
        }
    };

    // 문의 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return (
        <Container>
            <HeadTag title={headerCategories.inquiry[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.inquiry[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>{pageDescriptionCategories.createInquiry[lang]}</p>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputCategories.title[lang]}
                            type={"text"}
                            id={"inquiry-title"}
                            name={"title"}
                            placeholder={placeholderCategories.title[lang]}
                            register={register}
                            errorMessage={errors.title?.message}
                        />
                        <Select
                            categories={inquiryInfoCategories}
                            name={"category"}
                            register={register}
                            errorMessage={errors.category?.message}
                            type={"radio"}
                        />
                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                            text={text}
                            countOfText={countOfText}
                            changeTextareaHandler={changeTextareaHandler}
                        />
                        <Button
                            type={"submit"}
                            variant={"filled"}
                            width={"full"}
                            color={"primary"}
                            size={"lg"}
                        >
                            {buttonCategories.sendInquiry[lang]}
                        </Button>
                    </form>
                </>
            }
        </Container>
    );
};

export default CreateInquiryPage;