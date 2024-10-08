import {FC, useMemo, useState} from "react";
import {ReactSVG} from "react-svg";

import Button from "@components/common/Button";
import InputError from "@components/common/InputError";

import {ICalendarProps} from "@/types/componentProps.ts";
import {days} from "@constants/calendarCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import generateCalendar from "@util/generateCalendar.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {
    Container,
    CalendarMonthWrapper,
    HolidayName,
    CalendarDateWrapper,
    DateButtonWrapper,
    DateButton,
    DayWrapper,
} from "./style.ts";

import arrowBack from "@assets/icons/arrow_back_small.svg";
import arrowForward from "@assets/icons/arrow_forward_small.svg";



const Calendar:FC<ICalendarProps> = ({onSelectDate, date, machine}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const {lang} = useThemeStore();

    const dateList = useMemo(() => generateCalendar({currentDate, lang, machine}), [currentDate, lang, machine]);

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
    };

    return (
        <Container>
            <div>
                {/*달력 월 조작 부분*/}
                <CalendarMonthWrapper preventPrevBtn={isPrevMonthDisabled} preventNextBtn={isNextMonthDisabled}>
                    <div>
                        <Button
                            type={"button"}
                            content={<ReactSVG src={arrowBack}/>}
                            width={"fit"}
                            color={"third"}
                            scale={"small"}
                            onClick={handlePrevMonth}
                        />
                        <h4>{`${currentDate.getFullYear()}. ${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`}</h4>
                        <Button
                            type={"button"}
                            content={<ReactSVG src={arrowForward}/>}
                            width={"fit"}
                            color={"third"}
                            scale={"small"}
                            onClick={handleNextMonth}
                        />
                    </div>
                </CalendarMonthWrapper>

                {/*요일 부분*/}
                <DayWrapper>
                    {days[lang].map((day, idx) => (
                        <span key={idx}>{day}</span>
                    ))}
                </DayWrapper>

                {/*날짜 버튼 부분*/}
                <CalendarDateWrapper>
                    {dateList.map((d, idx) => (
                        <DateButtonWrapper
                            key={`${idx} ${d.date}`}
                        >
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
                            </div>
                        </DateButtonWrapper>
                    ))}
                </CalendarDateWrapper>
            </div>

            {isEmpty && <InputError errorMessage={messageCategories.emptyDate[lang]}/>}


            {/*날짜 선택 완료 부분*/}
            <Button
                type={"button"}
                content={`${selectedDate ? selectedDate.toLocaleDateString('default', { month: "2-digit", day: 'numeric' }) : ""} ${buttonCategories.select[lang]}`}
                width={"full"}
                color={"primary"}
                scale={"big"}
                onClick={() => !selectedDate ? setIsEmpty(true) : handleRegisterDate(selectedDate)}
            />
        </Container>
    );
};

export default Calendar;