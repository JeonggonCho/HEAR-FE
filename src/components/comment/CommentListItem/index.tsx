import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ProfileImage from "@components/common/ProfileImage";
import Flex from "@components/common/Flex";
import LikeComment from "@components/comment/LikeComment";
import CommentDropdown from "@components/comment/CommentDropdown";
import UpdateComment from "@components/comment/UpdateComment";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import useTextarea from "@hooks/useTextarea.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import {IComment} from "@/types/comment.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import CommentContext from "@context/CommentContext.ts";
import {
    AuthorWrapper,
    ContentWrapper,
    TimeWrapper,
    // CommentBtnWrapper,
    // VerticalLine
} from "./style.ts";
import stripHtml from "@util/stripHtml.ts";
import UserInfoModal from "@components/common/UserInfoModal";
// import {buttonCategories} from "@constants/buttonCategories.ts";


const CommentListItem = (props: IComment) => {
    const [isLiked, setIsLiked] = useState<boolean>(props.isLiked);
    const [countOfLike, setCountOfLike] = useState(props.likes);

    const {lang} = useThemeStore();
    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();
    const {textareaRef, isEditMode, setIsEditMode} = useTextarea();
    const {commentSchema} = BoardSchemaProvider();

    type CommentFormDataType = z.infer<typeof commentSchema>;

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: {isValid},
    } = useForm<CommentFormDataType>({
        resolver: zodResolver(commentSchema),
        mode: "onChange",
    });

    useEffect(() => {
        reset({content: stripHtml(props.content)});
    }, [props.content, reset]);

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
            setIsEditMode: setIsEditMode,
            isLiked: isLiked,
            setIsLiked: setIsLiked,
            countOfLike: countOfLike,
            setCountOfLike: setCountOfLike,
            register: register,
            isValid: isValid,
            handleSubmit: handleSubmit,
            setValue: setValue,
        }}>
            <Flex gap={8} style={{width: "100%", margin: "24px 0"}}>
                <Flex direction={"column"} align={"center"}>
                    <ProfileImage size={28}/>
                    {/*<VerticalLine/>*/}
                </Flex>

                <Flex
                    direction={"column"}
                    style={{
                        flexGrow: "1",
                        marginTop: !isEditMode && props.authorId === userInfo?.userId ? "-2px" : "6px",
                    }}
                >
                    <Flex align={"center"} justify={"space-between"} style={{marginRight: "6px"}}>
                        {userData?.role === "assistant" || userData?.role === "admin" ? (
                            <UserInfoModal
                                trigger={<AuthorWrapper>{props.author}</AuthorWrapper>}
                                userId={props.authorId as string}
                            />
                        ) : (
                            <AuthorWrapper>{props.author}</AuthorWrapper>
                        )}
                        {!isEditMode && props.authorId === userInfo?.userId && <CommentDropdown/>}
                    </Flex>

                    {isEditMode ?
                        <UpdateComment/>
                        :
                        <>
                            <ContentWrapper dangerouslySetInnerHTML={{__html: generateLinksAndLineBreaks(getValues("content") || '')}}/>
                            <Flex align={"center"} gap={12} style={{marginLeft: "6px"}}>
                                <TimeWrapper>{timeStamp}</TimeWrapper>
                                <Flex align={"center"} gap={12}>
                                    <LikeComment/>
                                    {/*<CommentBtnWrapper>*/}
                                    {/*    {buttonCategories.comment[lang]}*/}
                                    {/*</CommentBtnWrapper>*/}
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