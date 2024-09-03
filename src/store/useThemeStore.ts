import {create} from "zustand";
import {devtools, persist, createJSONStorage} from "zustand/middleware";

interface ITheme {
    lang: "ko" | "en" | "ch";
    theme: "light" | "dark";
}

interface IThemeState extends ITheme {
    setLang: (lang: ITheme["lang"]) => void;
    setTheme: (theme: ITheme["theme"]) => void;
}

const themeStore = (set: any): IThemeState => ({
    lang: "ko",
    theme: "light",
    setLang: (lang: ITheme["lang"]) => set({lang}),
    setTheme: (theme: ITheme["theme"]) => set({theme})
});

export const useThemeStore = create<IThemeState>()(
    devtools(
        persist(themeStore, {name: "theme-storage", storage: createJSONStorage(() => localStorage)})
    )
);