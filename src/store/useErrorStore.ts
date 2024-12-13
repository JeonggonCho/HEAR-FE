import {create} from "zustand";


export type RequestErrorType = {
    name: string;
    message: string;
    errorCode?: number;
    displayMode: "toast" | "fallback";
}


interface IErrorState {
    error: RequestErrorType | null;
    setError: (error: RequestErrorType) => void;
    clearError: () => void;
}


export const useErrorStore = create<IErrorState>((set) => ({
    error: null,
    setError: (error) => set({error}),
    clearError: () => set({error: null}),
}));