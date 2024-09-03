import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from "zustand/middleware";

interface IUser {
    id: string;
    username: string;
    email: string;
    role: "admin" | "student" | "manager";
    passQuiz: boolean;
    studio: string;
    year: "1" | "2" | "3" | "4" | "5";
    tel: string;
    studentId: string;
    warning: number;
    countOfLaser: number;
}

interface IUserState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

const userStore = (set: any):IUserState => ({
    user: null,
    setUser: (user: IUser) => set({ user }),
    clearUser: () => set({ user: null }),
});

export const useUserStore = create<IUserState>()(
    devtools(
        persist(userStore, {name:"user-storage", storage: createJSONStorage(() => localStorage)})
    )
);
