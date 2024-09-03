import {create} from "zustand";

interface IAuthState {
    isLoggedIn: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const useAuthStore = create<IAuthState>((set) => ({
    isLoggedIn: false,
    token: null,
    login: (token: string) => set({ token: token }),
    logout: () => set({ token: null }),
}));

export default useAuthStore;