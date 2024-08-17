import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/main/MainPage";
import InstructionPage from "./pages/instructions/InstructionPage";
import ReservationPage from "./pages/reservation/ReservationPage";
import AccountPage from "./pages/auth/AccountPage";
import {useEffect, useState} from "react";
import SplashPage from "./pages/main/SplashPage";
import NoticePage from "./pages/notice/NoticePage";
import InstructionPrinter from "./pages/instructions/printer/InstructionPrinter";
import InstructionLaser from "./pages/instructions/laser/InstructionLaser";
import InstructionHeat from "./pages/instructions/heat/InstructionHeat";
import InstructionCnc from "./pages/instructions/cnc/InstructionCnc";
import InstructionSaw from "./pages/instructions/saw/InstructionSaw";
import InstructionVacuum from "./pages/instructions/vacuum/InstructionVacuum";
import NoticeDetailPage from "./pages/notice/NoticeDetailPage";
import ReservationPrinter from "./pages/reservation/ReservationPrinter";
import ReservationLaser from "./pages/reservation/ReservationLaser";
import ReservationHeat from "./pages/reservation/ReservationHeat";
import ReservationCnc from "./pages/reservation/ReservationCnc";
import ReservationSaw from "./pages/reservation/ReservationSaw";
import ReservationVacuum from "./pages/reservation/ReservationVacuum";
import AlarmPage from "./pages/main/AlarmPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPasswordPage from "./pages/auth/FindPasswordPage";
import ConditionPage from "./pages/reservation/ConditionPage";
import SignupDonePage from "./pages/auth/SignupDonePage";
import ReservationDonePage from "./pages/reservation/ReservationDonePage";
import InquiryCreatePage from "./pages/qna/InquiryCreatePage";
import FeedbackCreatePage from "./pages/qna/FeedbackCreatePage";
import FeedbackPage from "./pages/qna/FeedbackPage";
import InquiryPage from "./pages/qna/InquiryPage";
import UpdateAccountPage from "./pages/auth/UpdateAccountPage";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage";

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
                    <Route path="alarm" element={<AlarmPage/>}/>

                    <Route path="inquiry" element={<InquiryPage/>}/>
                    <Route path="inquiry/new" element={<InquiryCreatePage/>}/>
                    <Route path="feedback" element={<FeedbackPage/>}/>
                    <Route path="feedback/new" element={<FeedbackCreatePage/>}/>

                    <Route path="account" element={<AccountPage/>}/>
                    <Route path="account/update" element={<UpdateAccountPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignupPage/>}/>
                    <Route path="signup/done" element={<SignupDonePage/>}/>
                    <Route path="password/reset" element={<FindPasswordPage/>}/>
                    <Route path="password/update" element={<UpdatePasswordPage/>}/>

                    <Route path="notice" element={<NoticePage/>}/>
                    <Route path="notice/:noticeId" element={<NoticeDetailPage/>}/>

                    <Route path="instruction" element={<InstructionPage/>}/>
                    <Route path="instruction/3d-printer" element={<InstructionPrinter/>}/>
                    <Route path="instruction/laser" element={<InstructionLaser/>}/>
                    <Route path="instruction/heat" element={<InstructionHeat/>}/>
                    <Route path="instruction/cnc" element={<InstructionCnc/>}/>
                    <Route path="instruction/saw" element={<InstructionSaw/>}/>
                    <Route path="instruction/vacuum" element={<InstructionVacuum/>}/>

                    <Route path="reservation" element={<ReservationPage/>}/>
                    <Route path="reservation/done" element={<ReservationDonePage/>}/>
                    <Route path="reservation/3d-printer" element={<ReservationPrinter/>}/>
                    <Route path="reservation/laser" element={<ReservationLaser/>}/>
                    <Route path="reservation/heat" element={<ReservationHeat/>}/>
                    <Route path="reservation/cnc" element={<ReservationCnc/>}/>
                    <Route path="reservation/saw" element={<ReservationSaw/>}/>
                    <Route path="reservation/vacuum" element={<ReservationVacuum/>}/>
                    <Route path="reservation/condition" element={<ConditionPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
