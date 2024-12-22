import {Dispatch, SetStateAction, useMemo, useState} from "react";
import ProfileImage from "@components/common/ProfileImage";
import Flex from "@components/common/Flex";
import LikeComment from "@components/comment/LikeComment";
import CommentDropdown from "@components/comment/CommentDropdown";
import UpdateComment from "@components/comment/UpdateComment";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import useTextarea from "@hooks/useTextarea.ts";
import {IComment} from "@/types/comment.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import CommentContext from "@context/CommentContext.ts";
import {
    AuthorWrapper,
    CommentBtnWrapper,
    ContentWrapper,
    TimeWrapper, VerticalLine
} from "./style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const CommentListItem = (props: IComment) => {
    const [isLiked, setIsLiked] = useState<boolean>(props.isLiked);
    const [countOfLike, setCountOfLike] = useState(props.likes);

    const {lang} = useThemeStore();
    const {userInfo} = useUserInfoStore();
    const {textareaRef, isEditMode, setIsEditMode, text, setText, handleTextChange} = useTextarea();

    // 댓글 링크 처리
    const transformedContent = useMemo(() => {
        return generateLinksAndLineBreaks(props.content);
    }, [props.content]);

    const [content, setContent] = useState(transformedContent);

    // 댓글 생성 일자
    const timeStamp = useMemo(() => {
        return props.createdAt ? getTimeStamp(props.createdAt, lang) : '';
    }, [props.createdAt]);

    return (
        <CommentContext.Provider value={{
            commentId: props._id,
            setComments: props.setComments,
            setRefDoc: props.setRefDoc as Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>,
            textareaRef: textareaRef,
            text: text,
            setText: setText,
            handleTextChange: handleTextChange,
            setIsEditMode: setIsEditMode,
            content: props.content,
            setContent: setContent,
            isLiked: isLiked,
            setIsLiked: setIsLiked,
            countOfLike: countOfLike,
            setCountOfLike: setCountOfLike,
        }}>
            <Flex gap={8} style={{width: "100%", margin: "24px 0"}}>
                <Flex direction={"column"} align={"center"}>
                    <ProfileImage size={28}/>
                    <VerticalLine/>
                </Flex>

                <Flex direction={"column"} style={{marginTop: "6px", flexGrow: "1"}}>
                    <Flex align={"center"} justify={"space-between"} style={{marginRight: "6px"}}>
                        <AuthorWrapper>{props.author}</AuthorWrapper>
                        {!isEditMode && props.authorId === userInfo?.userId && <CommentDropdown/>}
                    </Flex>

                    {isEditMode ?
                        <UpdateComment/>
                        :
                        <>
                            <ContentWrapper dangerouslySetInnerHTML={{__html: content}}/>
                            <Flex align={"center"} gap={12} style={{marginLeft: "6px"}}>
                                <TimeWrapper>{timeStamp}</TimeWrapper>
                                <Flex align={"center"} gap={12}>
                                    <LikeComment/>
                                    <CommentBtnWrapper>
                                        {buttonCategories.comment[lang]}
                                    </CommentBtnWrapper>
                                </Flex>
                            </Flex>
                        </>
                    }
                </Flex>
            </Flex>
        </CommentContext.Provider>
    );
};

export default CommentListItem;