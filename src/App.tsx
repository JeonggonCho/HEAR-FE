import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import InstructionPage from "./pages/InstructionPage";
import ReservationPage from "./pages/ReservationPage";
import QnaPage from "./pages/QnaPage";
import AccountPage from "./pages/AccountPage";
import {useEffect, useState} from "react";
import SplashPage from "./pages/SplashPage";

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
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to="/main"/>}/>
                    <Route path="main" element={<MainPage/>}/>
                    <Route path="instruction" element={<InstructionPage/>}/>
                    <Route path="reservation" element={<ReservationPage/>}/>
                    <Route path="qna" element={<QnaPage/>}/>
                    <Route path="account" element={<AccountPage/>}/>


                    <Route path="instruction/3d-printer" element={<InstructionPage/>}/>
                    <Route path="instruction/laser" element={<InstructionPage/>}/>
                    <Route path="instruction/heat" element={<InstructionPage/>}/>
                    <Route path="instruction/cnc" element={<InstructionPage/>}/>
                    <Route path="instruction/saw" element={<InstructionPage/>}/>
                    <Route path="instruction/vacuum" element={<InstructionPage/>}/>


                    <Route path="reservation/3d-printer" element={<ReservationPage/>}/>
                    <Route path="reservation/laser" element={<ReservationPage/>}/>
                    <Route path="reservation/heat" element={<ReservationPage/>}/>
                    <Route path="reservation/cnc" element={<ReservationPage/>}/>
                    <Route path="reservation/saw" element={<ReservationPage/>}/>
                    <Route path="reservation/vacuum" element={<ReservationPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
