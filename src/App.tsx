import {useEffect, useState} from "react";
import {Global, ThemeProvider} from "@emotion/react";
import {global} from "@styles/global.ts";

import SplashPage from "@pages/main/SplashPage";
import AppRoute from "@routes/AppRoute.tsx";
import ScrollToTop from "@components/ScrollToTop";

import {useThemeStore} from "@store/useThemeStore.ts";
import {darkTheme, lightTheme} from "@styles/theme.ts";

import './App.css';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    // 다크모드 라이트모드 테마 생성
    const {isDarkMode} = useThemeStore();
    const theme = isDarkMode ? darkTheme : lightTheme;

    // 스플래쉬 페이지 설정
    useEffect(() => {
        const splashShown = sessionStorage.getItem('splashShown');

        if (!splashShown) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('splashShown', 'true');
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <Global styles={global(theme)}/>
                <ScrollToTop/>
                {isLoading ?
                    <SplashPage/>
                :
                    <AppRoute/>
                }
            </ThemeProvider>
        </div>
    );
};

export default App;
