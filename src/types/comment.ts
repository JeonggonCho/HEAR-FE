import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";

export interface IComment {
    _id: string;
    content: string;
    createdAt: Date;
    author: string;
    authorId: string;
    likes: number;
    isLiked: boolean;
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
    setRefDoc?: React.Dispatch<React.SetStateAction<IInquiryProps | IFeedbackProps | INotice>>;
}