import {ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Header} from "@components/common/Header";
import Input from "@components/common/Input";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const CreateNoticePage = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest({loadingTime: 2000});
    const {text, handleTextChange, countOfText} = useTextarea();
    const {noticeSchema} = BoardSchemaProvider();

    type NoticeFormData = z.infer<typeof noticeSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue
    } = useForm<NoticeFormData>({
        resolver: zodResolver(noticeSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    // 공지 생성 요청하기
    const submitHandler:SubmitHandler<NoticeFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/notices/new",
                method: "post",
                data: data,
            });
            const {noticeId} = response.data;
            if (noticeId) {
                setTimeout(() => {
                    navigate(`/board/notice/${noticeId}`, { replace: true });
                }, 2000);
            }
        } catch (err) {
            console.error("공지 등록 중 에러 발생: ", err);
        }
    };

    // 공지 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    return (
        <Container>
            <HeadTag title={headerCategories.createNotice[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.createNotice[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    label={inputCategories.title[lang]}
                    type={"text"}
                    id={"notice-title"}
                    name={"title"}
                    placeholder={placeholderCategories.title[lang]}
                    register={register}
                    errorMessage={errors.title?.message}
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
                    disabled={!isValid}
                >
                    <Flex align={"center"} justify={"center"} gap={12}>
                        {buttonCategories.createNotice[lang]}
                        {isLoading &&
                          <LoadingLoop size={24} background={false} thickness={3} ringColor={"main"}/>
                        }
                    </Flex>
                </Button>
            </form>
        </Container>
    );
};

export default CreateNoticePage;