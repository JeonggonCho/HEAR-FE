export interface IAuthResponseData {
    userId: string;
    email: string;
    username: string;
    studentId: string;
    year: "1" | "2" | "3" | "4" | "5";
    studio: string;
    passQuiz: boolean;
    countOfLaserPerWeek: number;
    countOfLaserPerDay: number;
    countOfWarning: number;
    tel: string;
    role: "student" | "manager" | "admin";
    accessToken: string;
    refreshToken: string;
    lab?: string;
}