import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";


export const MonthWrapper = styled.h4`
    color: ${({theme}) => theme.colors.font.main};
    margin: 12px 0 0 4px;
    font-weight: 500;
    font-size: 1.15rem;
`;

export const CalendarBoardWrapper = styled.div`
    height: 55vh;
    width: calc(100% + 16px);
    overflow-y: auto;
    padding-right: 16px;

    &::-webkit-scrollbar {
        width: 6px;
        right: 100px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => theme.colors.font.placeholder};
        border-radius: 10px;
    }

    @media (max-width: 500px) {
        max-height: 50vh;
    }
`;

export const DayWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 500;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    position: sticky;
    background-color: ${({theme}) => theme.colors.bg.main};
    top: 0;

    span {
        color: ${({theme}) => theme.colors.font.main};
        display: inline-block;
        margin: auto;
    }

    & > span:first-of-type {
        color: ${({theme}) => theme.colors.font.danger};
    }
    
    & > span:last-of-type {
        color: ${({theme}) => theme.colors.font.primary};
    }
`;

export const CalendarDateWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 24px;
`;

export const DateButtonWrapper = styled.div`
    min-height: 72px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 0 12px;
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    width: 100%;

    & > div:last-of-type {
        min-height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        
        // 예약 유무 마크
        & > span {
            width: 8px;
            height: 8px;
            background-color: ${({theme}) => theme.colors.font.placeholder};
            border-radius: 50%;
        }
    }
`;

export const HolidayName = styled.div`
    color: ${({theme}) => theme.colors.font.danger};
    text-align: center;
    font-size: ${() => {
      const {lang} = useThemeStore();
      return lang === "en" ? "0.7rem" : "0.85rem";
    }};
    line-height: 1.3;
    text-wrap: wrap;
`;

export const DateButton = styled.button<{selected: boolean | null, disabled: boolean, today: boolean, holiday: boolean, saturday: boolean, sunday: boolean}>`
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: ${({today}) => today ? "50%" : "10px"};
    background: ${({selected, theme, today}) => selected ? theme.colors.button.primary : today ? theme.colors.button.second : "none"};
    color: ${({selected, theme, disabled, holiday, today, saturday, sunday}) => today ? "white" : saturday ? theme.colors.font.primary : sunday ? theme.colors.font.danger : holiday ? theme.colors.font.danger : disabled ? theme.colors.font.placeholder : selected ? "white" : theme.colors.font.main};
    font-size: 1rem;
    text-align: center;
    cursor: ${({disabled, holiday}) => disabled || holiday ? "not-allowed" : "pointer"};
    transition: all 0.1s ease-in-out 0s;
`;

export const CalendarReservationLegendWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    & > span:first-of-type {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${({theme}) => theme.colors.font.placeholder};
    }

    & > span:last-of-type {
        color: ${({theme}) => theme.colors.font.sub};
        font-size: 0.87rem;
        line-height: 1.3;
        text-wrap: wrap;
        word-break: keep-all;
    }
`;