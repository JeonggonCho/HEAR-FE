import React, {ChangeEvent, ReactElement, ReactNode} from "react";
import {To} from "react-router-dom";
import {ITab} from "@/types/tab.ts";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";
import {ICommonMachine, IHeats, ILasers, ILaserTimes, IPrinters} from "@/types/machine.ts";
import {IUserInfo} from "@/types/user.ts";

// 버튼(Button) props
export interface IButtonProps {
    type: "button" | "link" | "submit";
    to?: string;
    content : string | ReactElement;
    width: "full" | "fit";
    color: "primary" | "approval" | "second" | "third" | "danger";
    scale: "small" | "normal" | "big";
    onClick?: () => void;
    disabled?: boolean;
}


// 확인 내용(ConfirmContent) props
export interface IConfirmContentProps {
    text: string;
    description?: string;
    leftBtn: React.ReactElement;
    rightBtn: React.ReactElement;
}


// 에러 메시지(ErrorContent) props
export interface IErrorContentProps {
    text: string;
    closeModal: () => void;
}


// 헤더(Header) props
export interface IHeaderProps {
    leftChild?: ReactNode;
    centerText?: string;
    rightChild?: ReactNode;
}


// 인풋(Input) props
export interface IInputProps<TFieldValues extends FieldValues> {
    label?: string;
    type: string;
    id: string;
    name: FieldPath<TFieldValues>;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    register?: UseFormRegister<TFieldValues>;
    errorMessage?: string;
    readonly?: boolean;
    visibleToggle?: boolean;
    disabled?: boolean;
    value?: any;
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
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectDate: (date:string) => void;
}


// 링크(Link) props
export interface ILinkProps {
    text: String;
    to: To;
    color: "primary" | "second";
}


// 링크 카드(LinkCard) props
export interface ILinkCardProps {
    image?: string;
    name: string;
    to: string;
    type: "linear" | "grid";
    isDisabled?: boolean;
}


// 모달 (Modal) props
export interface IModalProps {
    title?: string;
    content: React.ReactElement;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    type: "popup" | "bottomSheet";
}


// 모형제작실 약도(RoomMap) props
export interface IRoomMapProps {
    machine : "cnc" | "laser" | "printer" | "vacuum";
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 선택(Select) props
export interface ISelectWithLabelProps {
    register?: UseFormRegister<any>;
    name: string;
    errorMessage?: string;
    label?: string;
    categories: {
        label: string;
        value: any;
        id: string;
    }[];
    type: "radio" | "checkbox";
    onSelectChange?: (selectedValue: any, categories: any) => void;
    values?: any[];
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
    content?: string;
    answer?: boolean;
    type?: "inquiry" | "feedback";
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
}


// 플로팅 버튼(FloatingButton) props
export interface IFloatingButtonProps {
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


// 드롭다운(Dropdown) props
export interface IDropdownProps {
    type: "feedback" | "inquiry" | "notice";
    id: string;
}


// 말풍선(ChatBubble) props
export interface IChatBubbleProps {
    text: string;
    isMine: boolean;
    showProfile: boolean;
    profile: string;
}


// 기기 관리 카드(MachineManageCard) props
export interface IMachineManageCardProps {
    name: string;
    img: string;
    machineData: ILasers[] | IPrinters[] | IHeats[] | ICommonMachine[];
    machineType: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc";
    setMachines?: React.Dispatch<React.SetStateAction<ILasers[]>> | React.Dispatch<React.SetStateAction<IPrinters[]>>;
    timeData?: ILaserTimes[];
    setTimes?: React.Dispatch<React.SetStateAction<ILaserTimes[]>>;
}


// 토글(Toggle) props
export interface IToggleProps {
    click: () => void;
    status: boolean;
    isLoading: boolean;
}


// 기기추가 모달 내용(NewMachineContent) props
export interface INewMachineContentProps {
    title: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    machine: "laser" | "printer";
    setMachines: React.Dispatch<React.SetStateAction<ILasers[]>> | React.Dispatch<React.SetStateAction<IPrinters[]>>
}


// 레이저 커팅기 시간 목록(TimeListContent) props
export interface ITimeListContentProps {
    timeList: ILaserTimes[];
    setTimeList?: React.Dispatch<React.SetStateAction<ILaserTimes[]>>;
}


// 시간 목록 아이템(TimeListItem) props
export interface ITimeListItemProps {
    index: number;
    id: string;
    startTime: string;
    endTime: string;
    onDelete: () => void;
}


// 유저 정보 모달(UserInfoContent) props
export interface IUserInfoContentProps {
    userId: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onUserInfoUpdate?: (updatedUser: IUserInfo) => void;
}


// 토스트(Toast) props
export interface IToastProps {
    text: string;
    time: number;
    setToast?: () => void;
}


// 필터 내용(FilterContent) props
export interface IFilterContentProps {
    filter: any;
    setFilter: React.Dispatch<React.SetStateAction<any>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}