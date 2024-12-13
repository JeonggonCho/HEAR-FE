import {create} from 'zustand';


interface IToastState {
    text: string | null;
    type: "success" | "error" | "normal";
    key: number; // 리렌더링을 위해 사용
    showToast: (text: string, type: "success" | "error" | "normal", time?: number) => void;
    hideToast: () => void;
}


export const useToastStore = create<IToastState>((set) => ({
    text: null,
    type: "normal",
    key: 0,
    showToast: (text, type = "normal", time = 6000) => {
        set((state) => ({ text, type, key: state.key + 1}));
        setTimeout(() => set({text: null, type: "normal"}), time);
    },
    hideToast: () => set({text: null, type: "normal"}),
}));