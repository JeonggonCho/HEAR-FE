export interface IComment {
    _id: string;
    content: string;
    createdAt: Date;
    author: string;
    authorId: string;
    likes: number;
    isLiked: boolean;
}