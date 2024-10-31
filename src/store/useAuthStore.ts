import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";

interface IAuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpirationDate: Date | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const authStore = (set: any): IAuthState => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    accessTokenExpirationDate: null,
    login: (accessToken: string, refreshToken: string) => {
        const accessTokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
        set({accessToken, refreshToken, isLoggedIn: true, accessTokenExpirationDate});
    },
    logout: () => set({accessToken: null, refreshToken: null, isLoggedIn: false, accessTokenExpirationDate: null}),
});

export const useAuthStore = create<IAuthState>()(
    devtools(
        persist(authStore, {name: "auth-storage", storage: createJSONStorage(() => localStorage)})
    )
);