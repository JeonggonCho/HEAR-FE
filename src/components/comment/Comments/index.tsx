import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import CommentListItem from "@components/comment/CommentListItem";
import ProfileImage from "@components/common/ProfileImage";
import Icon from "@components/common/Icon";
import useRequest from "@hooks/useRequest.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {CommentListWrapper, Container, TextareaWrapper, EmptyMessage} from "./style.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import send from "@assets/icons/send.svg";


interface ICommentsProps {
    refId: string;
    refType: "inquiry" | "feedback" | "notice";
    textareaRef?: MutableRefObject<HTMLTextAreaElement>;
    comments: IComment[];
    setComments: Dispatch<SetStateAction<IComment[]>>;
    setRefDoc: Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>;
}


const Comments = (
    {
        refId,
        refType,
        textareaRef,
        comments,
        setComments,
        setRefDoc,
    }: ICommentsProps
) => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {commentSchema} = BoardSchemaProvider();

    type CommentFormDataType = z.infer<typeof commentSchema>;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<CommentFormDataType>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        },
        mode: "onChange",
    });

    const countOfTextarea = watch("content").trim().length;

    // 댓글 생성 요청하기
    const submitHandler = async (data: CommentFormDataType) => {
        if (countOfTextarea === 0) return;

        const commentData = {
            content: data.content,
            refId: refId,
            refType: refType,
        };

        try {
            const response = await sendRequest({
                url: "/comments",
                method: "post",
                data: commentData,
            });
            if (response.data) {
                setComments(prevState => [response.data, ...prevState]);
                setRefDoc(prevState => {
                    if (!prevState) return prevState;
                    return ({
                        ...prevState,
                        comments: prevState.comments + 1
                    });
                });
            }
            setValue("content", "");
        } catch (err) {
            console.error("댓글 생성 요청 중 에러 발생: ", err);
        }
    };

    return (
        <>
            <Container onSubmit={handleSubmit(submitHandler)}>
                <ProfileImage size={28}/>
                <TextareaWrapper textLength={countOfTextarea}>
                    <Textarea
                        register={register}
                        ref={textareaRef}
                        name={"content"}
                        showCount={false}
                        placeholder={placeholderCategories.comment[lang]}
                        isScrolled={false}
                    />
                    {countOfTextarea > 0 &&
                      <Button
                        type={"submit"}
                        variant={"filled"}
                        width={"fit"}
                        color={"approval"}
                        size={"sm"}
                        style={{padding: "4px 8px"}}
                      >
                        <Icon svg={send} size={24}/>
                      </Button>
                    }
                </TextareaWrapper>
            </Container>

            {comments.length === 0 ?
                <EmptyMessage>{messageCategories.emptyComment[lang]}</EmptyMessage>
                :
                <CommentListWrapper>
                    {comments.map((comment, index) => (
                        <CommentListItem
                            key={`${index} ${comment._id}`}
                            _id={comment._id}
                            content={comment.content}
                            author={comment.author}
                            authorId={comment.authorId}
                            likes={comment.likes}
                            createdAt={comment.createdAt}
                            isLiked={comment.isLiked}
                            setComments={setComments}
                            setRefDoc={setRefDoc as Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
                        />
                    ))}
                </CommentListWrapper>
            }
        </>
    );
};

export default Comments;