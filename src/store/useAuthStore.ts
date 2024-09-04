import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";

interface IAuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const authStore = (set: any): IAuthState => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    login: (accessToken: string, refreshToken: string) => set({ accessToken, refreshToken, isLoggedIn: true }),
    logout: () => set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
});

export const useAuthStore = create<IAuthState>()(
    devtools(
        persist(authStore, {name: "auth-storage", storage: createJSONStorage(() => localStorage)})
    )
);