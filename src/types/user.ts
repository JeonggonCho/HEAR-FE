export interface IUserInfo {
    userId: string;
    username: string;
    email: string;
    year: "1" | "2" | "3" | "4" | "5";
    studentId: string;
    studio: string;
    passQuiz: boolean;
    countOfWarning: number;
    tel: string;
}