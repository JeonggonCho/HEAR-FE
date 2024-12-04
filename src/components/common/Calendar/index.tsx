import {useMemo, useState} from "react";
import {ReactSVG} from "react-svg";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import InputMessage from "@components/common/InputMessage";
import generateCalendar from "@util/generateCalendar.ts";
import {ICalendarProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {
    HolidayName,
    CalendarDateWrapper,
    DateButtonWrapper,
    DateButton,
    DayWrapper,
    CalendarBoardWrapper,
    CalendarReservationLegendWrapper,
    MonthWrapper,
} from "./style.ts";
import {calendarInformation, days} from "@constants/calendarCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import arrowBack from "@assets/icons/arrow_back_small.svg";
import arrowForward from "@assets/icons/arrow_forward_small.svg";


const Calendar = ({calendarType="normal", onSelectDate, date, machine, condition, setModal, selectWeekend=false}: ICalendarProps) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const {lang} = useThemeStore();

    const dateList = useMemo(() =>
        generateCalendar({calendarType, currentDate, lang, machine, condition, selectWeekend}), [calendarType, currentDate, lang, machine, condition, selectWeekend]);

    // 이전 달로 이동 제한하기 (이번 달까지만)
    const isPrevMonthDisabled = useMemo(() => (
        currentDate.getFullYear() === new Date().getFullYear() &&
        currentDate.getMonth() === new Date().getMonth()
    ), [currentDate]);

    // 다음 달로 이동 제한하기 (다음 달까지만)
    const isNextMonthDisabled = useMemo(() => (
        currentDate.getFullYear() === new Date().getFullYear() &&
        currentDate.getMonth() === new Date().getMonth() + 1
    ), [currentDate]);


    // 이전 달로 이동
    const handlePrevMonth = () => {
        if (!isPrevMonthDisabled) {
            setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
        }
    };

    // 다음 달로 이동
    const handleNextMonth = () => {
        if (!isNextMonthDisabled) {
            setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
        }
    };

    // 날짜 선택하기
    const handleSelectDay = (date:Date) => {
        setSelectedDate((prevState) => {return prevState?.toDateString() !== date.toDateString() ? date : null});
    };

    // 선택한 날짜 입력하기
    const handleRegisterDate = (date:Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        onSelectDate(formattedDate);
        setIsEmpty(false);
        setModal(false);
    };

    return (
        <>
            {/*달력 월 조작 부분*/}
            <Flex
                direction={"row"}
                align={"flex-start"}
                justify={"space-between"}
                style={{marginBottom: "28px"}}
            >
                <MonthWrapper>{`${currentDate.getFullYear()}. ${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`}</MonthWrapper>

                <Flex direction={"column"} gap={12}>
                    <Flex direction={"row"} align={"center"} gap={12}>
                        <Button
                            type={"button"}
                            variant={"filled"}
                            width={"fit"}
                            color={"third"}
                            size={"sm"}
                            onClick={handlePrevMonth}
                            disabled={isPrevMonthDisabled}
                            style={{padding: "4px 6px"}}
                        >
                            <ReactSVG src={arrowBack}/>
                        </Button>
                        <Button
                            type={"button"}
                            variant={"filled"}
                            width={"fit"}
                            color={"third"}
                            size={"sm"}
                            onClick={handleNextMonth}
                            disabled={isNextMonthDisabled}
                            style={{padding: "4px 6px"}}
                        >
                            <ReactSVG src={arrowForward}/>
                        </Button>
                    </Flex>

                    {calendarType === "reservation" &&
                      <CalendarReservationLegendWrapper>
                        <span/>
                        <span>{calendarInformation.reservation[lang]}</span>
                      </CalendarReservationLegendWrapper>
                    }
                </Flex>
            </Flex>

            <CalendarBoardWrapper>
                {/*요일 부분*/}
                <DayWrapper>
                    {days[lang].map((day, idx) => (
                        <span key={idx}>{day}</span>
                    ))}
                </DayWrapper>

                {/*날짜 버튼 부분*/}
                <CalendarDateWrapper>
                    {dateList.map((d, idx) => (
                        <DateButtonWrapper key={`${idx} ${d.date}`}>
                            <DateButton
                                onClick={() => handleSelectDay(d.date)}
                                selected={selectedDate && d.date.toDateString() === selectedDate.toDateString()}
                                disabled={d.holidayInfo.status || d.disabled}
                                sunday={d.sunday}
                                saturday={d.saturday}
                                today={d.today}
                                holiday={d.holidayInfo.status}
                            >
                                {d.date.getDate()}
                            </DateButton>

                            <div>
                                {d.holidayInfo.name && <HolidayName>{d.holidayInfo.name}</HolidayName>}
                                {d.isReserved && <span/>}
                            </div>
                        </DateButtonWrapper>
                    ))}
                </CalendarDateWrapper>
            </CalendarBoardWrapper>

            {isEmpty && <InputMessage message={messageCategories.emptyDate[lang]} type={"error"}/>}

            {/*날짜 선택 완료 부분*/}
            <Button
                type={"button"}
                variant={"filled"}
                width={"full"}
                color={"primary"}
                size={"lg"}
                onClick={() => !selectedDate ? setIsEmpty(true) : handleRegisterDate(selectedDate)}
            >
                {`${selectedDate ? selectedDate.toLocaleDateString('default', {year: "numeric", month: "numeric", day: 'numeric'}) : ""} ${buttonCategories.select[lang]}`}
            </Button>
        </>
    );
};

export default Calendar;