import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from "zustand/middleware";

interface IUserInfo {
    userId: string;
    username: string;
    email: string;
    studentId: string;
}

interface IUserData {
    year: "1" | "2" | "3" | "4" | "5";
    studio: string;
    passQuiz: boolean;
    countOfWarning: number;
    countOfLaser: number;
    tel: string;
}

interface IUserInfoState {
    userInfo: IUserInfo | null;
    setUserInfo: (userInfo: IUserInfo) => void;
    clearUserInfo: () => void;

}

interface IUserDataState {
    userData: IUserData | null;
    setUserData: (userData: IUserData) => void;
    clearUserData: () => void;
}

const userStore = (set: any):IUserInfoState => ({
    userInfo: null,
    setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
    clearUserInfo: () => set({ userInfo: null }),

});

export const useUserInfoStore = create<IUserInfoState>()(
    devtools(
        persist(userStore, {name:"user-storage", storage: createJSONStorage(() => localStorage)})
    )
);

export const useUserDataStore = create((set: any): IUserDataState => ({
    userData: null,
    setUserData: (userData: IUserData) => set({userData}),
    clearUserData: () => set({ userData: null }),
}));