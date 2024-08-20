import {create} from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    userToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    userToken: null,
    login: (token: string) => set({ isAuthenticated: true, userToken: token }),
    logout: () => set({ isAuthenticated: false, userToken: null }),
}));

export default useAuthStore;