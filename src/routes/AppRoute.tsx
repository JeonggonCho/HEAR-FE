import {lazy, Suspense, useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

const Layout = lazy(() => import("@layouts/Layout"));

const MainPage = lazy(() => import("@pages/main/MainPage"));
const AlarmPage = lazy(() => import("@pages/main/AlarmPage"));
const InquiryPage = lazy(() => import("@pages/qna/InquiryPage"));
const InquiryDetailPage = lazy(() => import("@pages/qna/InquiryDetailPage"));
const InquiryCreatePage = lazy(() => import("@pages/qna/InquiryCreatePage"));
const FeedbackPage = lazy(() => import("@pages/qna/FeedbackPage"));
const FeedbackDetailPage = lazy(() => import("@pages/qna/FeedbackDetailPage"));
const FeedbackCreatePage = lazy(() => import("@pages/qna/FeedbackCreatePage"));
const AccountPage = lazy(() => import("@pages/auth/AccountPage"));
const UpdateAccountPage = lazy(() => import("@pages/auth/UpdateAccountPage"));
const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@pages/auth/SignupPage"));
const SignupDonePage = lazy(() => import("@pages/auth/SignupDonePage"));
const FindPasswordPage = lazy(() => import("@pages/auth/FindPasswordPage"));
const UpdatePasswordPage = lazy(() => import("@pages/auth/UpdatePasswordPage"));
const NoticePage = lazy(() => import("@pages/qna/NoticePage"));
const NoticeCreatePage = lazy(() => import("@pages/qna/NoticeCreatePage"));
const NoticeDetailPage = lazy(() => import("@pages/qna/NoticeDetailPage"));
const InstructionPage = lazy(() => import("@pages/instructions/InstructionPage"));
const InstructionPrinter = lazy(() => import("@pages/instructions/printer/InstructionPrinter"));
const InstructionLaser = lazy(() => import("@pages/instructions/laser/InstructionLaser"));
const InstructionHeat = lazy(() => import("@pages/instructions/heat/InstructionHeat"));
const InstructionCnc = lazy(() => import("@pages/instructions/cnc/InstructionCnc"));
const InstructionSaw = lazy(() => import("@pages/instructions/saw/InstructionSaw"));
const InstructionVacuum = lazy(() => import("@pages/instructions/vacuum/InstructionVacuum"));
const ReservationPage = lazy(() => import("@pages/reservation/ReservationPage"));
const ReservationDonePage = lazy(() => import("@pages/reservation/ReservationDonePage"));
const ReservationPrinter = lazy(() => import("@pages/reservation/ReservationPrinter"));
const ReservationLaser = lazy(() => import("@pages/reservation/ReservationLaser"));
const ReservationHeat = lazy(() => import("@pages/reservation/ReservationHeat"));
const ReservationCnc = lazy(() => import("@pages/reservation/ReservationCnc"));
const ReservationSaw = lazy(() => import("@pages/reservation/ReservationSaw"));
const ReservationVacuum = lazy(() => import("@pages/reservation/ReservationVacuum"));
const ConditionPage = lazy(() => import("@pages/reservation/ConditionPage"));
const QuizPage = lazy(() => import("@pages/quiz/QuizPage"));
const NotFoundPage = lazy(() => import("@pages/main/NotFoundPage"));

import {useAuthStore} from "@store/useAuthStore.ts";
import isTokenValid from "@util/isTokenValid.ts";

const AppRoute = () => {
    const {isLoggedIn, accessToken, logout} = useAuthStore();

    useEffect(() => {
        if (isLoggedIn && !isTokenValid(accessToken)) {
            logout();
        }
    }, [isLoggedIn, accessToken, logout]);

    return (
        <Suspense fallback={<div>suspense 로딩중...</div>}>
            <Routes>
                <Route path="/" element={<Layout showNav={isLoggedIn}/>}>
                    <Route index element={<Navigate to={isLoggedIn ? "/main" : "/login"}/>}/>
                    {isLoggedIn ?
                        <>
                            {/*로그인 유저 라우트*/}
                            <Route path="main" element={<MainPage/>}/>
                            <Route path="signup/done" element={<SignupDonePage/>}/>
                            <Route path="account" element={<AccountPage/>}/>
                            <Route path="account/update" element={<UpdateAccountPage/>}/>
                            <Route path="password/reset" element={<FindPasswordPage/>}/>
                            <Route path="password/update" element={<UpdatePasswordPage/>}/>

                            <Route path="notice/new" element={<NoticeCreatePage/>}/>
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

                            <Route path="inquiry/new" element={<InquiryCreatePage/>}/>
                            <Route path="feedback/new" element={<FeedbackCreatePage/>}/>
                            <Route path="inquiry" element={<InquiryPage/>}/>
                            <Route path="inquiry/:inquiryId" element={<InquiryDetailPage/>}/>
                            <Route path="feedback" element={<FeedbackPage/>}/>
                            <Route path="feedback/:feedbackId" element={<FeedbackDetailPage/>}/>

                            <Route path="alarm" element={<AlarmPage/>}/>
                            <Route path="quiz" element={<QuizPage/>}/>
                        </>
                    :
                        <>
                            {/*비로그인 유저 라우트*/}
                            <Route index element={<Navigate to="/login"/>}/>
                            <Route path="login" element={<LoginPage/>}/>
                            <Route path="signup" element={<SignupPage/>}/>
                            <Route path="signup/done" element={<SignupDonePage/>}/>
                            <Route path="password/reset" element={<FindPasswordPage/>}/>
                        </>
                    }

                    {/*로그인 유무 상관없는 공통 라우트*/}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoute;