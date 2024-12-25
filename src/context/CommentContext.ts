import { createContext, Dispatch, MutableRefObject, SetStateAction } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IFeedbackProps, IInquiryProps, INotice } from "@/types/componentProps.ts";
import { IComment } from "@/types/comment.ts";

type FormValues = {
    content: string;
};

const defaultRegister = (() => ({
    onChange: async () => Promise.resolve(),
    onBlur: async () => Promise.resolve(),
    ref: () => {},
    name: "content"
})) as unknown as UseFormRegister<FormValues>;

const CommentContext = createContext<{
    commentId: string;
    setComments: Dispatch<SetStateAction<IComment[]>>;
    setRefDoc: Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>;
    textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
    setIsEditMode: Dispatch<SetStateAction<boolean>>;
    isLiked: boolean;
    setIsLiked: Dispatch<SetStateAction<boolean>>;
    countOfLike: number;
    setCountOfLike: Dispatch<SetStateAction<number>>;
    register: UseFormRegister<FormValues>;
    isValid: boolean;
    handleSubmit: UseFormHandleSubmit<FormValues>;
    setValue: UseFormSetValue<FormValues>;
}>({
    commentId: "",
    setComments: () => undefined as unknown as Dispatch<SetStateAction<IComment[]>>,
    setRefDoc: () => undefined as unknown as Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>,
    textareaRef: { current: null },
    setIsEditMode: () => undefined as unknown as Dispatch<SetStateAction<boolean>>,
    isLiked: false,
    setIsLiked: () => undefined as unknown as Dispatch<SetStateAction<boolean>>,
    countOfLike: 0,
    setCountOfLike: () => undefined as unknown as Dispatch<SetStateAction<number>>,
    register: defaultRegister,
    isValid: false,
    handleSubmit: (() => Promise.resolve()) as unknown as UseFormHandleSubmit<FormValues>,
    setValue: (() => {}) as UseFormSetValue<FormValues>
});

export default CommentContext;