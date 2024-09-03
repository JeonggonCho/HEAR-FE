import {FC, useMemo, useState} from "react";
import {
    Container,
    CalendarMonthWrapper,
    DaysOfWeekWrapper,
    CalendarDayWrapper,
    DayButton
} from "./style.ts";
import {ReactSVG} from "react-svg";
import arrowBack from "@assets/icons/arrow_back_small.svg";
import arrowForward from "@assets/icons/arrow_forward_small.svg";
import {ICalendarProps} from "@/types/componentProps.ts";
import {daysOfWeek} from "@constants/calendar.ts";
import ColoredBtn from "@components/ColoredBtn";
import generateCalendar from "@util/generateCalendar.ts";

const Calendar:FC<ICalendarProps> = ({setModal, onSelectDate}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const days = useMemo(() => generateCalendar(currentDate), [currentDate]);

    const isPrevMonthDisabled = useMemo(() => (
        currentDate.getFullYear() === new Date().getFullYear() &&
        currentDate.getMonth() === new Date().getMonth()
    ), [currentDate]);

    const isNextMonthDisabled = useMemo(() => (
        currentDate.getFullYear() === new Date().getFullYear() &&
        currentDate.getMonth() === new Date().getMonth() + 1
    ), [currentDate]);


    const handlePrevMonth = () => {
        if (!isPrevMonthDisabled) {
            setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
        }
    };

    const handleNextMonth = () => {
        if (!isNextMonthDisabled) {
            setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
        }
    };

    const handleCurrentMonth = () => {
        setCurrentDate(new Date());
    };

    const handleSelectDay = (date:Date) => {
        setSelectedDate((prevState) => {return prevState?.toDateString() !== date.toDateString() ? date : null});
    };

    const handleRegisterDate = (date:Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        onSelectDate(formattedDate);
        setModal(false);
    };

    return (
        <Container>
            <CalendarMonthWrapper>
                <div>
                    <ColoredBtn
                        type={"button"}
                        content={<ReactSVG src={arrowBack}/>}
                        width={"fit"}
                        color={"third"}
                        scale={"small"}
                        onClick={handlePrevMonth}
                    />
                    <h4>{`${currentDate.getFullYear()}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`}</h4>
                    <ColoredBtn
                        type={"button"}
                        content={<ReactSVG src={arrowForward}/>}
                        width={"fit"}
                        color={"third"}
                        scale={"small"}
                        onClick={handleNextMonth}
                    />
                </div>

                <ColoredBtn
                    type={"button"}
                    content={"이번달"}
                    width={"fit"}
                    color={"third"}
                    scale={"small"}
                    onClick={handleCurrentMonth}
                />
            </CalendarMonthWrapper>

            <DaysOfWeekWrapper>
                {daysOfWeek.map((day, idx) => (
                    <span key={idx}>{day}</span>
                ))}
            </DaysOfWeekWrapper>

            <CalendarDayWrapper>
                {days.map((date, idx) => (
                    <DayButton
                        key={idx}
                        onClick={() => handleSelectDay(date)}
                        selected={selectedDate && date.toDateString() === selectedDate.toDateString()}
                    >
                        {date.getDate()}
                    </DayButton>
                ))}
            </CalendarDayWrapper>

            <ColoredBtn
                type={"button"}
                content={`${selectedDate ? selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric' }) : ""} 선택완료`}
                width={"full"}
                color={"approval"}
                scale={"big"}
                disabled={selectedDate === null}
                onClick={() => selectedDate !== null ? handleRegisterDate(selectedDate) : null}
            />
        </Container>
    );
};

export default Calendar;