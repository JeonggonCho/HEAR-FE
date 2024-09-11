import {ICategory} from "@/types/navCategory.ts";
import home from "@assets/icons/home.svg";
import note from "@assets/icons/note.svg";
import reservation from "@assets/icons/reservation.svg";
// import quiz from "@assets/icons/quiz.svg";
import inquiry from "@assets/icons/inquiry.svg";
import account from "@assets/icons/account.svg";

export const navCategories: ICategory[] = [
    { label: "홈", icon: home, path: "/main" },
    { label: "사용법", icon: note, path: "/instruction" },
    { label: "예약", icon: reservation, path: "/reservation" },
    // { label: "교육", icon: quiz, path: "/quiz" },
    { label: "소통", icon: inquiry, path: "/communication" },
    { label: "내정보", icon: account, path: "/account" },
];