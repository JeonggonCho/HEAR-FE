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
    passEducation: boolean;
    countOfWarning: number;
    countOfLaserPerWeek: number;
    countOfLaserPerDay: number;
    tel: string;
    role: "student" | "assistant" | "admin";
    lab?: string;
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

const userInfoStore = (set: any): IUserInfoState => ({
    userInfo: null,
    setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
    clearUserInfo: () => set({ userInfo: null }),

});

export const useUserInfoStore = create<IUserInfoState>()(
    devtools(
        persist(userInfoStore, {name: "user-Info-storage", storage: createJSONStorage(() => localStorage)})
    )
);

const userDataStore = (set: any): IUserDataState => ({
    userData: null,
    setUserData: (userData: IUserData) => set({userData}),
    clearUserData: () => set({ userData: null }),
});

export const useUserDataStore = create<IUserDataState>()(
    devtools(
        persist(userDataStore, {name: "user-data-storage", storage: createJSONStorage(() => localStorage)})
    )
);