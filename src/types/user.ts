export interface IUserList {
    userId: string;
    username: string;
    year: "1" | "2" | "3" | "4" | "5";
    studentId: string;
    passEducation: boolean;
    countOfWarning: number;
}

export interface IUserInfo extends IUserList {
    email: string;
    studio: string;
    tel: string;
}

export interface IUserFilter {
    year: Array<"all" | "1" | "2" | "3" | "4" | "5">;
    passEducation: Array<"all" | "pass" | "fail">;
    countOfWarning: Array<"all" | "0" | "1" | "2">;
}