import {lazy, Suspense, useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

const Layout = lazy(() => import("@layouts/Layout"));
const CommunicationLayout = lazy(() => import("@layouts/CommunicationLayout"));

const MainPage = lazy(() => import("@pages/main/MainPage"));
const AlarmPage = lazy(() => import("@pages/main/AlarmPage"));
const InquiryPage = lazy(() => import("@pages/inquiry/InquiryPage"));
const InquiryDetailPage = lazy(() => import("@pages/inquiry/InquiryDetailPage"));
const CreateInquiryPage = lazy(() => import("@pages/inquiry/CreateInquiryPage"));
const UpdateInquiryPage = lazy(() => import("@pages/inquiry/UpdateInquiryPage"));
const FeedbackPage = lazy(() => import("@pages/feedback/FeedbackPage"));
const FeedbackDetailPage = lazy(() => import("@pages/feedback/FeedbackDetailPage"));
const CreateFeedbackPage = lazy(() => import("@pages/feedback/CreateFeedbackPage"));
const UpdateFeedbackPage = lazy(() => import("@pages/feedback/UpdateFeedbackPage"));
const AccountPage = lazy(() => import("@pages/auth/AccountPage"));
const UpdateAccountPage = lazy(() => import("@pages/auth/UpdateAccountPage"));
const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@pages/auth/SignupPage"));
const SignupDonePage = lazy(() => import("@pages/auth/SignupDonePage"));
const FindPasswordPage = lazy(() => import("@pages/auth/FindPasswordPage"));
const UpdatePasswordPage = lazy(() => import("@pages/auth/UpdatePasswordPage"));
const NoticePage = lazy(() => import("@pages/notice/NoticePage"));
const CreateNoticePage = lazy(() => import("@pages/notice/CreateNoticePage"));
const NoticeDetailPage = lazy(() => import("@pages/notice/NoticeDetailPage"));
const UpdateNoticePage = lazy(() => import("@pages/notice/UpdateNoticePage"));
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
const MachinesPage = lazy(() => import("@pages/management/MachinesPage"));
const UsersPage = lazy(() => import("@pages/management/UsersPage"));
const ReservationsPage = lazy(() => import("@pages/management/ReservationsPage"));

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

                            <Route path="/communication" element={<CommunicationLayout/>}>
                                <Route index element={<Navigate to="notice" />} />
                                <Route path="notice" element={<NoticePage/>}/>
                                <Route path="inquiry" element={<InquiryPage/>}/>
                                <Route path="feedback" element={<FeedbackPage/>}/>
                            </Route>

                            <Route path="communication/notice/new" element={<CreateNoticePage/>}/>
                            <Route path="communication/notice/:noticeId" element={<NoticeDetailPage/>}/>
                            <Route path="communication/notice/:noticeId/update" element={<UpdateNoticePage/>}/>

                            <Route path="communication/inquiry/new" element={<CreateInquiryPage/>}/>
                            <Route path="communication/inquiry/:inquiryId" element={<InquiryDetailPage/>}/>
                            <Route path="communication/inquiry/:inquiryId/update" element={<UpdateInquiryPage/>}/>

                            <Route path="communication/feedback/new" element={<CreateFeedbackPage/>}/>
                            <Route path="communication/feedback/:feedbackId" element={<FeedbackDetailPage/>}/>
                            <Route path="communication/feedback/:feedbackId/update" element={<UpdateFeedbackPage/>}/>

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


                            <Route path="machines" element={<MachinesPage/>}/>
                            <Route path="users" element={<UsersPage/>}/>
                            <Route path="reservations" element={<ReservationsPage/>}/>

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