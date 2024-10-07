import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    min-height: 580px;
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const CalendarMonthWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;

    h4 {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0;
        font-weight: 500;
        font-size: 1.15rem;
    }

    div {
        display: flex;
        align-items: center;
        gap: 20px;
        
        button {
            padding: 6px;
        }
        
        svg {
            fill: ${({theme}) => theme.colors.font.sub};
        }
    }
`;

export const DayWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 500;
    margin-bottom: 20px;

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
    height: 74px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 0 10px;
    border-bottom: 1px solid ${({theme}) => theme.colors.font.placeholder};

    & > div:last-of-type {
        min-height: 14px;
    }
`;

export const HolidayName = styled.div`
    color: ${({theme}) => theme.colors.font.sub};
    font-size: 0.85rem;
    line-height: 1.3;
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