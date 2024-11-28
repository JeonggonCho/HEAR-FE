import {useEffect, useState} from "react";
import {Global, ThemeProvider} from "@emotion/react";
import {Helmet} from "react-helmet-async";
import {global} from "@styles/global.ts";

import SplashPage from "@pages/home/SplashPage";
import AppRoute from "@routes/AppRoute.tsx";
import ScrollToTop from "@components/common/ScrollToTop";
import Toast from "@components/common/Toast";

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
            <Helmet>
                <title>HEAR</title>
            </Helmet>

            <ThemeProvider theme={theme}>
                <Global styles={global(theme)}/>
                <ScrollToTop/>
                {isLoading ?
                    <SplashPage/>
                :
                    <AppRoute/>
                }
                <Toast/>
            </ThemeProvider>
        </div>
    );
};

export default App;
