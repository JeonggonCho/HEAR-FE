import React, {ChangeEvent, FormEvent, MutableRefObject, ReactElement} from "react";
import {ReactSVG} from "react-svg";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import CommentListItem from "@components/board/CommentListItem";
import ProfileImage from "@components/common/ProfileImage";
import {useThemeStore} from "@store/useThemeStore.ts";
import {CommentListWrapper, Container, TextareaWrapper, EmptyMessage} from "./style.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import send from "@assets/icons/send.svg";


interface ICommentsProps {
    text: string;
    textareaRef?: MutableRefObject<HTMLTextAreaElement>;
    countOfText: number;
    handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    comments: IComment[];
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
    setRefDoc: React.Dispatch<React.SetStateAction<IInquiryProps | IFeedbackProps | INotice>>;
    submitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}


const Comments = (
    {
        text,
        textareaRef,
        countOfText,
        handleTextChange,
        comments,
        setComments,
        setRefDoc,
        submitHandler
    }: ICommentsProps) => {
    const {lang} = useThemeStore();

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
                        content={<ReactSVG src={send}/> as ReactElement}
                        width={"fit"}
                        color={"approval"}
                        scale={"small"}
                      />
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
                            setRefDoc={setRefDoc as React.Dispatch<React.SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
                        />
                    ))}
                </CommentListWrapper>
            }
        </>
    );
};

export default Comments;