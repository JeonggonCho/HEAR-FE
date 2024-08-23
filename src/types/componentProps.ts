import React, {ChangeEvent, ReactElement, ReactNode} from "react";
import {To} from "react-router-dom";
import {ITab} from "@/types/tab.ts";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";


// 채워진 버튼(ColoredBtn) props
export interface IColoredBtnProps {
    type: "button" | "link" | "submit";
    to ?: string;
    content : string | ReactElement;
    width: "full" | "fit";
    color: "primary" | "approval" | "second" | "third" | "danger";
    scale: "small" | "normal" | "big";
    onClick ?: () => void;
    disabled ?: boolean;
}


// 비워진 버튼(HollowBtn) props
export interface IHollowBtnProps {
    type: "button" | "link" | "submit";
    to ?: string;
    content : string | ReactElement;
    width: "full" | "fit";
    color: "primary" | "second" | "danger";
    scale: "small" | "normal" | "big";
    onClick ?: () => void;
    disabled ?: boolean;
}


// 확인 모달 내용(ConfirmModalContent) props
export interface IConfirmModalContentProps {
    text: string;
    description?: string;
    leftBtn: React.ReactElement;
    rightBtn: React.ReactElement;
}


// 헤더(Header) props
export interface IHeaderProps {
    leftChild?: ReactNode;
    centerText?: string;
    rightChild?: ReactNode;
}


// 인풋(InputWithLabel) props
export interface IInputWithLabelProps<TFieldValues extends FieldValues> {
    label: string;
    type: string;
    id: string;
    name: FieldPath<TFieldValues>;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    register: UseFormRegister<TFieldValues>;
    errorMessage?: string;
    readonly ?: boolean;
    visibleToggle ?: boolean;
}


// 언어 설정 카드(LangSettingCard) props
export interface ILangSettingCardProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 언어 설정 모달 내용(LangSettingModalContent) props
export interface ILangSettingModalContentProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// 달력 (Calendar) props
export interface ICalendarProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectDate: (date:string) => void;
}


// 링크(Link) props
export interface ILinkProps {
    text: String;
    to: To;
    color: "primary" | "second";
}


// 기기 사용법, 예약 아이템 props
export interface IMachineSelectorProps {
    image: string;
    name: string;
    to: string;
}


// 모달(Modal) props
export interface IModalProps {
    content: React.ReactElement;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 모형제작실 약도(RoomMap) props
export interface IRoomMapProps {
    machine : "cnc" | "laser" | "printer" | "vacuum";
}


// 선택(Select) props
export interface ISelectWithLabelProps {
    register: UseFormRegister<any>;
    name: string;
    errorMessage?: string;
    label?: string;
    categories: {
        label: string;
        value: string;
        id: string;
    }[];
}


// 탭(Tab) props
export interface ITabProps {
    tabs: ITab[];
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}


// 문의 리스트 아이템(InquiryListItem) props
export interface IInquiryListItemProps {
    id: number;
    title: string;
    author: string;
    date: string;
    category: "machine" | "reservation" | "room"| "etc";
    answer: boolean;
}


// 생성 버튼(CreateBtn) props
export interface ICreateBtnProps {
    to:To;
}


// 빈 내용(Empty) props
export interface IEmptyProps {
    image?: string;
    title: string;
    message?: string;
}


// 인풋 에러 메시지(InputError) props
export interface IInputErrorProps {
    errorMessage?: string | undefined;
}


// 텍스트 영역(Textarea) props
export interface ITextareaProps {
    register: UseFormRegister<any>;
    name: string;
    errorMessage?: string;
}