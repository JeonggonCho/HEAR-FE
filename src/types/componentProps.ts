import {Dispatch, SetStateAction} from "react";
import {ITab} from "@/types/tab.ts";


// 버튼형태 탭(Tab) props
interface IButtonTabProps {
    type: "button";
    tabs: ITab[];
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
}


// 라인형태 탭(Tab) props
interface ILineTabProps {
    type: "line";
    tabs: ITab[];
}

export type ITabProps = IButtonTabProps | ILineTabProps;


// 문의, 공지, 피드백 공통 타입
export interface IQna {
    _id: string;
    title: string;
    creator: string;
    createdAt: string;
    content: string;
    type?: "inquiry" | "feedback";
    views: number;
    likes: number;
    comments: number;
}


// 문의 타입
export interface IInquiryProps extends IQna {
    category: "machine" | "reservation" | "room"| "etc";
    creatorId?: string;
}


// 피드백 타입
export interface IFeedbackProps extends IQna {
    category: "good" | "bad" | "suggest"| "etc";
    creatorId?: string;
}


// 공지 (Notice) 타입
export interface INotice {
    _id: string;
    title: string;
    content?: string;
    createdAt: string;
    views: number;
    comments: number;
}


// 예약 내역 타입
export interface IReservation {
    machine: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc";
    _id: string;
    date: string;
    machineName?: string;
    startTime?: string;
    endTime?: string;
}
