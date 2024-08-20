import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@components/Layout";
import MainPage from "@pages/main/MainPage";
import AlarmPage from "@pages/main/AlarmPage";
import InquiryPage from "@pages/qna/InquiryPage";
import InquiryDetailPage from "@pages/qna/InquiryDetailPage";
import InquiryCreatePage from "@pages/qna/InquiryCreatePage";
import FeedbackPage from "@pages/qna/FeedbackPage";
import FeedbackDetailPage from "@pages/qna/FeedbackDetailPage";
import FeedbackCreatePage from "@pages/qna/FeedbackCreatePage";
import AccountPage from "@pages/auth/AccountPage";
import UpdateAccountPage from "@pages/auth/UpdateAccountPage";
import LoginPage from "@pages/auth/LoginPage";
import SignupPage from "@pages/auth/SignupPage";
import SignupDonePage from "@pages/auth/SignupDonePage";
import FindPasswordPage from "@pages/auth/FindPasswordPage";
import UpdatePasswordPage from "@pages/auth/UpdatePasswordPage";
import NoticePage from "@pages/notice/NoticePage";
import NoticeCreatePage from "@pages/notice/NoticeCreatePage";
import NoticeDetailPage from "@pages/notice/NoticeDetailPage";
import TestPage from "@pages/test/TestPage";
import InstructionPage from "@pages/instructions/InstructionPage";
import InstructionPrinter from "@pages/instructions/printer/InstructionPrinter";
import InstructionLaser from "@pages/instructions/laser/InstructionLaser";
import InstructionHeat from "@pages/instructions/heat/InstructionHeat";
import InstructionCnc from "@pages/instructions/cnc/InstructionCnc";
import InstructionSaw from "@pages/instructions/saw/InstructionSaw";
import InstructionVacuum from "@pages/instructions/vacuum/InstructionVacuum";
import ReservationPage from "@pages/reservation/ReservationPage";
import ReservationDonePage from "@pages/reservation/ReservationDonePage";
import ReservationPrinter from "@pages/reservation/ReservationPrinter";
import ReservationLaser from "@pages/reservation/ReservationLaser";
import ReservationHeat from "@pages/reservation/ReservationHeat";
import ReservationCnc from "@pages/reservation/ReservationCnc";
import ReservationSaw from "@pages/reservation/ReservationSaw";
import ReservationVacuum from "@pages/reservation/ReservationVacuum";
import ConditionPage from "@pages/reservation/ConditionPage";
import NotFoundPage from "@pages/main/NotFoundPage";

const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to="/main"/>}/>
                    <Route path="main" element={<MainPage/>}/>
                    <Route path="alarm" element={<AlarmPage/>}/>

                    <Route path="inquiry" element={<InquiryPage/>}/>
                    <Route path="inquiry/:inquiryId" element={<InquiryDetailPage/>}/>
                    <Route path="inquiry/new" element={<InquiryCreatePage/>}/>
                    <Route path="feedback" element={<FeedbackPage/>}/>
                    <Route path="feedback/:feedbackId" element={<FeedbackDetailPage/>}/>
                    <Route path="feedback/new" element={<FeedbackCreatePage/>}/>

                    <Route path="account" element={<AccountPage/>}/>
                    <Route path="account/update" element={<UpdateAccountPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignupPage/>}/>
                    <Route path="signup/done" element={<SignupDonePage/>}/>
                    <Route path="password/reset" element={<FindPasswordPage/>}/>
                    <Route path="password/update" element={<UpdatePasswordPage/>}/>

                    <Route path="notice" element={<NoticePage/>}/>
                    <Route path="notice/new" element={<NoticeCreatePage/>}/>
                    <Route path="notice/:noticeId" element={<NoticeDetailPage/>}/>

                    <Route path="test" element={<TestPage/>}/>

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
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default AppRoute;