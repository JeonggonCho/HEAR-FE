import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from "zustand/middleware";

interface IUser {
    userId: string;
    username: string;
    email: string;
    studentId: string;
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