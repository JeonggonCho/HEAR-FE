import {ICategory} from "@/types/navCategory.ts";
import home from "@assets/icons/home.svg";
import note from "@assets/icons/note.svg";
import reservation from "@assets/icons/reservation.svg";
import test from "@assets/icons/test.svg";
import question from "@assets/icons/question.svg";
import account from "@assets/icons/account.svg";

export const navCategories: ICategory[] = [
    { label: "홈", icon: home, path: "/main" },
    { label: "사용법", icon: note, path: "/instruction" },
    { label: "예약", icon: reservation, path: "/reservation" },
    { label: "교육", icon: test, path: "/test" },
    { label: "문의", icon: question, path: "/inquiry" },
    { label: "내정보", icon: account, path: "/account" },
];