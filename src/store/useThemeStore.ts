import {create} from "zustand";
import {devtools, persist, createJSONStorage} from "zustand/middleware";

interface ITheme {
    lang: "ko" | "en" | "ch";
    isDarkMode: boolean;
}

interface IThemeState extends ITheme {
    setLang: (lang: ITheme["lang"]) => void;
    setTheme: (isDarkMode: boolean) => void;
}

const themeStore = (set: any): IThemeState => ({
    lang: "ko",
    isDarkMode: false,
    setLang: (lang: ITheme["lang"]) => set({lang}),
    setTheme: (isDarkMode: boolean) => set({isDarkMode: !isDarkMode}),
});

export const useThemeStore = create<IThemeState>()(
    devtools(
        persist(themeStore, {name: "theme-storage", storage: createJSONStorage(() => localStorage)})
    )
);