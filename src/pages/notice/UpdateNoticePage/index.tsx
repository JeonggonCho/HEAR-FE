import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const UpdateNoticePage = () => {
    const [notice, setNotice] = useState<{title: string, content: string}>();

    const navigate = useNavigate();
    const {noticeId} = useParams();
    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {text, handleTextChange, countOfText, setCountOfText, setText} = useTextarea();
    const {noticeSchema} = BoardSchemaProvider();

    // 공지사항 디테일 조회
    const fetchNotice = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/notices/${noticeId}`,
            });
            const {title, content} = response.data.notice;
            setNotice({title, content});
        } catch (err) {
            console.error("공지 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, noticeId]);

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    type NoticeFormData = z.infer<typeof noticeSchema>;

    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm<NoticeFormData>({
        resolver: zodResolver(noticeSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    useEffect(() => {
        if (notice) {
            reset(notice);
            setText(notice.content);
            setCountOfText(notice.content.length);
        }
    }, [notice, reset]);

    // 공지 업데이트 요청하기
    const submitHandler:SubmitHandler<NoticeFormData> = async (data) => {
        try {
            await sendRequest({
                url: `/notices/${noticeId}`,
                method: "patch",
                data: data,
            });
            navigate(`/board/notice/${noticeId}`, {replace: true});
        } catch (err) {
            console.log("공지 수정 중 에러 발생: ", err);
        }
    };

    // 공지 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    return (
        <Container>
            <HeadTag title={headerCategories.updateNotice[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.updateNotice[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
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
                            changeTextareaHandler={changeTextareaHandler}
                            countOfText={countOfText}
                        />

                        <Button
                            type={"submit"}
                            variant={"filled"}
                            width={"full"}
                            color={"primary"}
                            size={"lg"}
                        >
                            {buttonCategories.editing[lang]}
                        </Button>
                    </form>
                </>
            }
        </Container>
    );
};

export default UpdateNoticePage;