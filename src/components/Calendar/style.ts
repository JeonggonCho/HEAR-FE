import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 12px 24px;
`;

export const CalendarMonthWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 28px;

    h4 {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0;
        font-weight: bold;
        font-size: 18px;
    }

    div {
        display: flex;
        align-items: center;
        gap: 12px;
        
        button {
            padding: 6px;
        }
        
        svg {
            fill: ${({theme}) => theme.colors.font.sub};
        }
    }
`;

export const DaysOfWeekWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: clamp(3px, 2vw, 30px);
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;

    span {
        color: ${({theme}) => theme.colors.font.main};
        display: inline-block;
        margin: auto;
    }

    & > span:first-of-type {
        color: ${({theme}) => theme.colors.font.danger};
    }
`;

export const CalendarDayWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: clamp(1px, 1vw, 30px);
    row-gap: 4px;
    text-align: center;
    margin-bottom: 24px;
`;

export const DayButton = styled.button<{selected: boolean | null}>`
    width: 40px;
    height: 40px;
    margin: auto;
    border: none;
    border-radius: 10px;
    background: ${({selected, theme}) => selected ? theme.colors.button.primary : "none"};
    color: ${({selected, theme}) => selected ? "white" : theme.colors.font.main};
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    transition: all 0.1s ease-in-out 0s;
`;