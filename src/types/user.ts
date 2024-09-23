export interface IUserList {
    userId: string;
    username: string;
    year: "1" | "2" | "3" | "4" | "5";
    studentId: string;
    passQuiz: boolean;
    countOfWarning: number;
}

export interface IUserInfo extends IUserList {
    email: string;
    studio: string;
    tel: string;
}