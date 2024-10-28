import {create} from 'zustand';

interface IToastState {
    text: string | null;
    type: "success" | "error" | "normal";
    showToast: (text: string, type: "success" | "error" | "normal", time?: number) => void;
    hideToast: () => void;
}

export const useToastStore = create<IToastState>((set) => ({
    text: null,
    type: "normal",
    showToast: (text, type = "normal", time = 6000) => {
        set({ text, type});
        setTimeout(() => set({text: null, type: "normal"}), time);
    },
    hideToast: () => set({text: null, type: "normal"}),
}));