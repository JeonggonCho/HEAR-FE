import {lazy, Suspense, useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {useAuthStore} from "@store/useAuthStore.ts";
import isTokenValid from "@util/isTokenValid.ts";

const Layout = lazy(() => import("@layouts/Layout"));

const HomePage = lazy(() => import("@pages/home/HomePage"));
const NotificationPage = lazy(() => import("@pages/home/NotificationPage"));
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
const SigninPage = lazy(() => import("@pages/auth/SigninPage"));
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
const ReservationDonePage = lazy(() => import("@pages/reservation/ReservationDonePage"));
const ReservationPrinter = lazy(() => import("@pages/reservation/ReservationPrinter"));
const ReservationLaser = lazy(() => import("@pages/reservation/ReservationLaser"));
const ReservationHeat = lazy(() => import("@pages/reservation/ReservationHeat"));
const ReservationCnc = lazy(() => import("@pages/reservation/ReservationCnc"));
const ReservationSaw = lazy(() => import("@pages/reservation/ReservationSaw"));
const ReservationVacuum = lazy(() => import("@pages/reservation/ReservationVacuum"));
const QuizPage = lazy(() => import("@pages/quiz/QuizPage"));
const NotFoundPage = lazy(() => import("@pages/home/NotFoundPage"));
const MachinesPage = lazy(() => import("@pages/management/MachinesPage"));
const UsersPage = lazy(() => import("@pages/management/UsersPage"));
const ReservationsPage = lazy(() => import("@pages/management/ReservationsPage"));
const MyReservationsPage = lazy(() => import("@pages/reservation/MyReservationsPage"));
const MyUsagePage = lazy(() => import("@pages/reservation/MyUsagePage"));
const MyInquiriesPage = lazy(() => import("@pages/inquiry/MyInquiriesPage"));
const MyWarningPage = lazy(() => import("@pages/auth/MyWarningPage"));

const AppRoute = () => {
    const {isLoggedIn, accessToken, logout} = useAuthStore();

    useEffect(() => {
        if (isLoggedIn && !isTokenValid(accessToken)) {
            logout();
        }
    }, [isLoggedIn, accessToken, logout]);

    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path="/" element={<Layout showNav={isLoggedIn}/>}>
                    <Route index element={<Navigate to={isLoggedIn ? "/home" : "/login"}/>}/>
                    {isLoggedIn ?
                        <>
                            {/*로그인 유저 라우트*/}
                            <Route path="home" element={<HomePage/>}/>
                            <Route path="signup/done" element={<SignupDonePage/>}/>
                            <Route path="account" element={<AccountPage/>}/>
                            <Route path="account/update" element={<UpdateAccountPage/>}/>
                            <Route path="password/reset" element={<FindPasswordPage/>}/>
                            <Route path="password/update" element={<UpdatePasswordPage/>}/>

                            <Route path="my-reservations" element={<MyReservationsPage/>}/>
                            <Route path="my-usage" element={<MyUsagePage/>}/>
                            <Route path="my-inquiries" element={<MyInquiriesPage/>}/>
                            <Route path="my-warning" element={<MyWarningPage/>}/>


                            <Route path="board/notice" element={<NoticePage/>}/>
                            <Route path="board/inquiry" element={<InquiryPage/>}/>
                            <Route path="board/feedback" element={<FeedbackPage/>}/>
                            <Route path="board/notice/new" element={<CreateNoticePage/>}/>
                            <Route path="board/notice/:noticeId" element={<NoticeDetailPage/>}/>
                            <Route path="board/notice/:noticeId/update" element={<UpdateNoticePage/>}/>

                            <Route path="board/inquiry/new" element={<CreateInquiryPage/>}/>
                            <Route path="board/inquiry/:inquiryId" element={<InquiryDetailPage/>}/>
                            <Route path="board/inquiry/:inquiryId/update" element={<UpdateInquiryPage/>}/>

                            <Route path="board/feedback/new" element={<CreateFeedbackPage/>}/>
                            <Route path="board/feedback/:feedbackId" element={<FeedbackDetailPage/>}/>
                            <Route path="board/feedback/:feedbackId/update" element={<UpdateFeedbackPage/>}/>

                            <Route path="instruction" element={<InstructionPage/>}/>
                            <Route path="instruction/3d-printer" element={<InstructionPrinter/>}/>
                            <Route path="instruction/laser" element={<InstructionLaser/>}/>
                            <Route path="instruction/heat" element={<InstructionHeat/>}/>
                            <Route path="instruction/cnc" element={<InstructionCnc/>}/>
                            <Route path="instruction/saw" element={<InstructionSaw/>}/>
                            <Route path="instruction/vacuum" element={<InstructionVacuum/>}/>

                            <Route path="reservation/done" element={<ReservationDonePage/>}/>
                            <Route path="reservation/3d-printer" element={<ReservationPrinter/>}/>
                            <Route path="reservation/laser" element={<ReservationLaser/>}/>
                            <Route path="reservation/heat" element={<ReservationHeat/>}/>
                            <Route path="reservation/cnc" element={<ReservationCnc/>}/>
                            <Route path="reservation/saw" element={<ReservationSaw/>}/>
                            <Route path="reservation/vacuum" element={<ReservationVacuum/>}/>

                            <Route path="management/machines" element={<MachinesPage/>}/>
                            <Route path="management/users" element={<UsersPage/>}/>
                            <Route path="management/reservations" element={<ReservationsPage/>}/>

                            <Route path="alarm" element={<NotificationPage/>}/>
                            <Route path="quiz" element={<QuizPage/>}/>
                        </>
                    :
                        <>
                            {/*비로그인 유저 라우트*/}
                            <Route index element={<Navigate to="/login"/>}/>
                            <Route path="login" element={<SigninPage/>}/>
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