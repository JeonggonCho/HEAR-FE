import React, {ChangeEvent, JSX, ReactElement, ReactNode} from "react";
import {To} from "react-router-dom";
import {ITab} from "@/types/tab.ts";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";
import {ICommonMachine, IHeats, ILasers, ILaserTimes, IPrinters} from "@/types/machine.ts";
import {IUserInfo} from "@/types/user.ts";
import {
    ILaserInfo,
    ILaserReservation,
    ILaserStatus,
    ILaserTimesinfo,
    IPrinterReservation
} from "@/types/reservation.ts";

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
    type?: "grid" | "flex";
    bgColor?: boolean;
}


// 인풋(Input) props
export interface IInputProps<TFieldValues extends FieldValues> {
    label?: string;
    subLabel?: string;
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