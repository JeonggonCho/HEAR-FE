export interface IComment {
    _id: string;
    content: string;
    createdAt: Date;
    author: string;
    likes: number;
}