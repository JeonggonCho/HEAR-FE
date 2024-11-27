import React, {ChangeEvent, MutableRefObject} from "react";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";
import {ITab} from "@/types/tab.ts";
import {EducationType, ITestAnswer} from "@/types/education.ts";


// 인풋(Input) props
export interface IInputProps<T extends FieldValues> {
    label?: string;
    subLabel?: string;
    type: string;
    id: string;
    name: FieldPath<T>;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    register?: UseFormRegister<T>;
    errorMessage?: string;
    readonly?: boolean;
    visibleToggle?: boolean;
    disabled?: boolean;
    value?: any;
    maxLength?: number;
}


// 언어 설정 카드(LangSettingCard) props
export interface ILangSettingCardProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 언어 설정 내용(LangSettingContent) props
export interface ILangSettingContentProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 달력 (Calendar) props
export interface ICalendarProps {
    calendarType: "normal" | "reservation";
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectDate: (date:string) => void;
    date?: string;
    machine?: "printer" | "saw" | "vacuum" | "cnc";
    condition?: any[];
    selectWeekend: boolean;
}


// 모달 (Index) props
export interface IModalProps {
    title?: string | React.ReactElement;
    content: React.ReactElement;
    setModal: (() => void) | React.Dispatch<React.SetStateAction<boolean>>;
    type: "popup" | "bottomSheet";
}


// 버튼형태 탭(Tab) props
interface IButtonTabProps {
    type: "button";
    tabs: ITab[];
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
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


// 텍스트 영역(Textarea) props
export interface ITextareaProps {
    register?: UseFormRegister<any>;
    name: string;
    errorMessage?: string;
    showCount?: boolean;
    isScrolled?: boolean;
    placeholder?: string;
    countOfText: number;
    text: string;
    changeTextareaHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    ref?: MutableRefObject<HTMLTextAreaElement | null>;
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


// 이메일 인증(EmailVerification) props
export interface IEmailVerificationProps<T extends FieldValues> {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    verificationCode: string;
    setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
    inputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    register: UseFormRegister<T>;
    emailErrorMessage?: string;
    verificationCodeErrorMessage?: string;
}


// 테스트 문제 리스트 아이템(TestListItem) props
export interface ITestListItemProps {
    question: EducationType;
    testAnswers: ITestAnswer[];
    setTestAnswers: React.Dispatch<React.SetStateAction<ITestAnswer[]>>;
    isAnswerFilled: boolean;
    inputAnswer: (e: any, question: EducationType) => void;
    isChecked: (optionId: string, question:EducationType) => boolean;
}
