import './App.css';
import {useEffect, useState} from "react";
import SplashPage from "./pages/main/SplashPage";
import AppRoute from "@router/AppRoute.tsx";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return <SplashPage/>;
    }

    return (
        <div className="app">
            <AppRoute/>
        </div>
    );
};

export default App;
