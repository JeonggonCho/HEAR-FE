import React, {ChangeEvent, FormEvent, JSX, MutableRefObject, ReactElement, ReactNode} from "react";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";
import {To} from "react-router-dom";
import {ITab} from "@/types/tab.ts";
import {ICommonMachine, IHeats, ILasers, ILaserTimes, IPrinters} from "@/types/machine.ts";
import {IUserInfo} from "@/types/user.ts";
import {
    ILaserInfo,
    ILaserReservation,
    ILaserStatus,
    ILaserTimesinfo,
    IPrinterReservation
} from "@/types/reservation.ts";
import {IComment} from "@/types/comment.ts";
import {EducationType} from "@/types/education.ts";


// 버튼(Button) props
export interface IButtonProps {
    type: "button" | "link" | "submit";
    to?: string;
    content : string | ReactElement;
    width: "full" | "fit";
    color: "primary" | "approval" | "second" | "third" | "danger";
    scale: "small" | "normal" | "big";
    onClick?: (e: any) => void;
    disabled?: boolean;
}


// 확인 내용(ConfirmContent) props
export interface IConfirmContentProps {
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
    type?: "grid" | "flex";
    bgColor?: boolean;
}


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
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectDate: (date:string) => void;
    date?: string;
    machine?: "printer" | "saw" | "vacuum" | "cnc";
    condition?: any[];
}


// 링크(Link) props
export interface ILinkProps {
    type: "text" | "card" | "button";
    name: string;
    to: To;
    image?: string;
    color?: "primary" | "second";
    isDisabled?: boolean;
    isLoading?: boolean;
}


// 모달 (Modal) props
export interface IModalProps {
    title?: string | React.ReactElement;
    content: React.ReactElement;
    setModal: (() => void) | React.Dispatch<React.SetStateAction<boolean>>;
    type: "popup" | "bottomSheet";
}


// 모형제작실 약도(RoomMap) props
export interface IRoomMapProps {
    machine : "cnc" | "laser" | "printer" | "vacuum";
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 선택(Select) props
export interface ISelectProps {
    register?: UseFormRegister<any>;
    name: string;
    errorMessage?: string;
    label?: string;
    categories: {
        label: string;
        value: any;
        id: string;
        status?: boolean;
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


// 플로팅 버튼(FloatingButton) props
export interface IFloatingButtonProps {
    type: "link" | "button";
    to?: To;
    action?: () => void;
    icon: string;
}


// 빈 내용(Empty) props
export interface IEmptyProps {
    image?: string;
    title: string;
    message?: string;
}


// 인풋 메시지(InputMessage) props
export interface IInputMessageProps {
    message: string;
    type: "error" | "approval";
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


// 드롭다운(Dropdown) props
export interface IDropdownProps {
    dropdownMenus: {
        icon: string;
        label: string;
        action: () => void;
    }[]
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
    userList: IUserInfo[];
    setUserList: React.Dispatch<React.SetStateAction<IUserInfo[]>>;
    setShowUserInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 필터 내용(FilterContent) props
export interface IFilterContentProps {
    filter: any;
    setFilter: React.Dispatch<React.SetStateAction<any>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}


// 레이저 커팅기 기기 및 시간 선택(LaserSelectContent) props
export interface ILaserSelectContentProps {
    laserInfo: ILaserInfo[];
    laserTimesInfo: ILaserTimesinfo[];
    reservationList: ILaserReservation[];
    setReservationList: React.Dispatch<React.SetStateAction<ILaserReservation[]>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// 카드 로딩 스켈레톤(CardLoading) Props
export interface ICardLoadingProps {
    bgColor?: "dark" | "light";
    widthValue?: string;
    heightValue?: string;
}


// 3D 프린터 날짜 및 기기 선택(PrinterSelectContent) props
export interface IPrinterSelectContentProps {
    setModal: () => void;
    onSelectDate: (date: string) => void;
    selectedDate: string | undefined;
    selectMachineMode: boolean;
    setSelectMachineMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMachine: string;
    setReservation: React.Dispatch<React.SetStateAction<IPrinterReservation | undefined>>;
    setSelectedMachine: React.Dispatch<React.SetStateAction<string>>;
}


// 뒤로가기 (ArrowBack) props
export interface IArrowBack {
    action?: () => void;
}


// 캐로젤 (Carousel) props
export interface ICarouselProps {
    contents: JSX.Element[];
}


// 차트 (Chart) props
export interface IChartProps {
    containerWidth?: string;
    containerHeight?: string;
    colors?: ("primary" | "green" | "danger" | "orange" | "purple")[];
    labels: string[];
    values: number[];
    type: "radialBar" | "line" | "bar" | "area" | "rangeArea" | "rangeBar" | "pie" | "donut" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "treemap" | undefined;
    startAngle?: number;
    endAngle?: number;
    labelOffset?: number;
    valueOffset?: number;
}


// 레이저 커팅기 예약 현황 내역(LaserReservationConditionContent) props
export interface ILaserReservationConditionContentProps {
    laserStatus: ILaserStatus[];
    rate: number;
    color: "primary" | "green" | "danger" | "orange" | "purple";
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


// 예약 내역 아이템(ReservationListItem) props
export interface IReservationListItemProps {
    reservation: IReservation;
    deleteHandler?: (reservations: {machine: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc", _id: string, date: string}[]) => void;
    isSelected?: boolean;
    selectHandler?: () => void;
}


// 타이머(Timer) props
export interface ITimerProps {
    defaultTime: number,
    action: () => void;
    resetTrigger: number;
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


// 댓글 목록(Comments) props
export interface ICommentsProps {
    text: string;
    textareaRef?: MutableRefObject<HTMLTextAreaElement>;
    countOfText: number;
    handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    comments: IComment[];
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
    setRefDoc: React.Dispatch<React.SetStateAction<IInquiryProps | IFeedbackProps | INotice>>;
    submitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}


// 문제 목록(QuestionListContent) props
export interface IQuestionListContentProps {
    onDragEnd: (result: any) => void;
    questions: EducationType[];
    removeQuestion: (targetIndex: string) => void;
    setQuestions: React.Dispatch<React.SetStateAction<EducationType[]>>;
}


// 문제 리스트 아이템(QuestionListItem) props
export interface IQuestionListItemProps {
    index: number;
    removeQuestion: (questionId: string) => void;
    question: EducationType;
    setQuestions: React.Dispatch<React.SetStateAction<EducationType[]>>;
}


// 옵션 목록(OptionListContent) props
export interface IOptionListContentProps {
    onDragEnd: (result: any) => void;
    question: EducationType;
    questionType: "singleChoice" | "multipleChoice";
    changeOptionContentHandler: (targetOptionId: string, content: string) => void;
    changeChoiceAnswerHandler: (targetOptionId: string) => void;
    removeOption: (targetOptionId: string) => void;
}


// 옵션 목록 아이템(OptionListItem) props
export interface IOptionListItem {
    questionType: "singleChoice" | "multipleChoice";
    index: number;
    option: {
        optionId: string;
        content: string;
        isAnswer: boolean;
    };
    changeOptionContentHandler: (targetOptionId: string, content: string) => void;
    changeChoiceAnswerHandler: (targetOptionId: string) => void;
    removeOption: (targetOptionId: string) => void;
}