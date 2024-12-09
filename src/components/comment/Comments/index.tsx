import {ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction} from "react";
import {ReactSVG} from "react-svg";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import CommentListItem from "@components/comment/CommentListItem";
import ProfileImage from "@components/common/ProfileImage";
import useRequest from "@hooks/useRequest.ts";
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
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    textareaRef?: MutableRefObject<HTMLTextAreaElement>;
    countOfText: number;
    handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    comments: IComment[];
    setComments: Dispatch<SetStateAction<IComment[]>>;
    setRefDoc: Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>;
}


const Comments = (
    {
        refId,
        refType,
        text,
        setText,
        textareaRef,
        countOfText,
        handleTextChange,
        comments,
        setComments,
        setRefDoc,
    }: ICommentsProps
) => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();

    // 댓글 생성 요청하기
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim().length === 0) return;

        const data = {
            content: text.trim(),
            refId: refId,
            refType: refType,
        };

        try {
            const response = await sendRequest({
                url: "/comments",
                method: "post",
                data: data,
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
            setText("");
        } catch (err) {
            console.error("댓글 생성 요청 중 에러 발생: ", err);
        }
    };

    return (
        <>
            <Container onSubmit={submitHandler}>
                <ProfileImage size={28}/>
                <TextareaWrapper textLength={text.length}>
                    <Textarea
                        ref={textareaRef}
                        name={"comment"}
                        showCount={false}
                        placeholder={placeholderCategories.comment[lang]}
                        countOfText={countOfText}
                        changeTextareaHandler={handleTextChange}
                        text={text}
                        isScrolled={false}
                    />
                    {text.trim().length > 0 &&
                      <Button
                        type={"submit"}
                        variant={"filled"}
                        width={"fit"}
                        color={"approval"}
                        size={"sm"}
                      >
                        <ReactSVG src={send}/>
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