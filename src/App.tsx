import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/main/MainPage";
import InstructionPage from "./pages/instructions/InstructionPage";
import ReservationPage from "./pages/reservation/ReservationPage";
import QnaPage from "./pages/qna/QnaPage";
import AccountPage from "./pages/auth/AccountPage";
import {useEffect, useState} from "react";
import SplashPage from "./pages/main/SplashPage";
import NoticePage from "./pages/notice/NoticePage";
import PrinterPage from "./pages/instructions/printer/PrinterPage";
import LaserPage from "./pages/instructions/laser/LaserPage";
import HeatPage from "./pages/instructions/heat/HeatPage";
import CncPage from "./pages/instructions/cnc/CncPage";
import SawPage from "./pages/instructions/saw/SawPage";
import VacuumPage from "./pages/instructions/vacuum/VacuumPage";
import NoticeDetailPage from "./pages/notice/NoticeDetailPage";
import SituationPage from "./pages/reservation/SituationPage";
import FeedBackPage from "./pages/qna/FeedBackPage";

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
                    <Route path="qna/feedback" element={<FeedBackPage/>}/>
                    <Route path="account" element={<AccountPage/>}/>
                    <Route path="notice" element={<NoticePage/>}/>
                    <Route path="notice/:noticeId" element={<NoticeDetailPage/>}/>


                    <Route path="instruction/3d-printer" element={<PrinterPage/>}/>
                    <Route path="instruction/laser" element={<LaserPage/>}/>
                    <Route path="instruction/heat" element={<HeatPage/>}/>
                    <Route path="instruction/cnc" element={<CncPage/>}/>
                    <Route path="instruction/saw" element={<SawPage/>}/>
                    <Route path="instruction/vacuum" element={<VacuumPage/>}/>


                    <Route path="reservation/3d-printer" element={<ReservationPage/>}/>
                    <Route path="reservation/laser" element={<ReservationPage/>}/>
                    <Route path="reservation/heat" element={<ReservationPage/>}/>
                    <Route path="reservation/cnc" element={<ReservationPage/>}/>
                    <Route path="reservation/saw" element={<ReservationPage/>}/>
                    <Route path="reservation/vacuum" element={<ReservationPage/>}/>
                    <Route path="reservation/situation" element={<SituationPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
