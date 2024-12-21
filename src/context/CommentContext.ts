import {createContext, Dispatch, MutableRefObject, SetStateAction} from "react";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";


const CommentContext = createContext<{
    commentId: string;
    setComments: Dispatch<SetStateAction<IComment[]>>;
    setRefDoc: Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>;
    textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
    setIsEditMode: Dispatch<SetStateAction<boolean>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    isLiked: boolean;
    setIsLiked: Dispatch<SetStateAction<boolean>>;
    countOfLike: number;
    setCountOfLike: Dispatch<SetStateAction<number>>;
}>({
    commentId: "",
    setComments: () => {},
    setRefDoc: () => {},
    textareaRef: { current: null } as MutableRefObject<HTMLTextAreaElement | null>,
    setIsEditMode: () => {},
    content: "",
    setContent: () => {},
    isLiked: false,
    setIsLiked: () => {},
    countOfLike: 0,
    setCountOfLike: () => {},
});

export default CommentContext;