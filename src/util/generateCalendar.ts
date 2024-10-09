import {solarHolidays} from "@constants/calendarCategories.ts";
import {isSameDay} from "@util/calculateDate.ts";

interface IGenerateCalendar {
    currentDate: Date;
    lang: "ko" | "en" | "ch";
    machine: "printer" | "saw" | "vacuum" | "cnc";
    condition?: any[];
}

const generateCalendar = ({currentDate, lang, machine, condition}:IGenerateCalendar) => { // 날짜를 인자로 받기
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // 현재 날짜의 해당 월의 첫번째 날의 (년도, 월, 일) 구하기
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // 현재 날짜의 해당 월의 마지막 날의 (년도, 월, 일) 구하기 -> 월에 +1 하고 일에 0을 주면 마지막 날 구할 수 있음

    const endOfCalendar = new Date(endOfMonth);
    endOfCalendar.setDate(endOfCalendar.getDate() + (6 - endOfCalendar.getDay())); // 마지막 주 토요일까지

    const days = []; // 생성된 날짜 정보를 담을 배열

    const today = new Date(); // 오늘 날짜를 가져오기

    let day = new Date(startOfMonth); // 해당 월의 시작 날짜
    while (day.getDay() !== 0) { // getDay()는 요일을 반환 (일요일:0, 월요일:1, 화요일:2, ...) 시작 날짜의 요일이 일요일이 아니면 수행
        day.setDate(day.getDate() - 1); // 일요일의 날짜가 될 때까지 하루씩 이전 날짜로 이동시키기
    }

    // 모든 예약 날짜 리스트
    const reservedDates = condition ? condition.map(value => new Date(value.date)) : undefined;

    while (day <= endOfCalendar) { // 마지막 주의 토요일까지 수행
        // 날짜 배열에 현재 날짜, 예약자, 예약 가능 상태, 오늘인지 상태를 추가하기

        // 오늘 이전 날짜인지 확인
        const beforeDate =  day.getTime() < today.getTime();

        // 주말인지 확인
        const isWeekend = [0, 6].includes(day.getDay());

        // 토요일인지 확인
        const isSaturday = day.getDay() === 6;

        // 일요일인지 확인
        const isSunday = day.getDay() === 0;

        // 년도, 월, 일 기준으로 현재 날짜인지 확인
        const isToday = day.getFullYear() === today.getFullYear() &&
            day.getMonth() === today.getMonth() &&
            day.getDate() === today.getDate();

        // 기기 확인
        let invalidMachine;
        if (machine === "cnc") {
            invalidMachine = day.getFullYear() === today.getFullYear() &&
                day.getMonth() === today.getMonth() &&
                day.getDate() === today.getDate() + 1;
        }

        // 고정 공휴일 체크
        const holiday = solarHolidays.find((h) => {
            return h.month === day.getMonth() && h.day === day.getDate();
        });

        // 해당 날짜의 모든 예약 리스트
        let reservationList = reservedDates ? reservedDates.filter(reservedDate => isSameDay(reservedDate, day)) : undefined;

        // 예약이 가득찼는지 체크
        let isFull = false;
        if (machine === "cnc" && reservationList) {
            isFull = reservationList.length >= 1;
        }

        days.push({
            date: new Date(day), // 날짜
            today: isToday, // 오늘 체크
            saturday: isSaturday, // 토요일 체크
            sunday: isSunday, // 일요일 체크
            holidayInfo: {status: !!holiday, name: holiday?.name[lang]}, // 공휴일 체크 및 공휴일이면 기념일 명까지 전달
            isReserved: reservationList && reservationList?.length > 0, // 예약 유무 체크
            disabled: isWeekend || beforeDate || invalidMachine || isFull || false, // 비활성화 체크
        });

        day.setDate(day.getDate() + 1); // 하루 증가시키기
    }

    return days; // 날짜 정보 배열 반환
};

export default generateCalendar;