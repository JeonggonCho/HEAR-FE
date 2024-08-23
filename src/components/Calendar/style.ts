import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 12px;

    h3 {
        font-weight: bold;
        font-size: 20px;
        margin: 0 0 32px;
    }
`;

export const CalendarMonthWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 28px;

    h4 {
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
            fill: #999999;
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
        display: inline-block;
        margin: auto;
    }

    & > span:first-of-type {
        color: #FF8585;
    }
`;

export const CalendarDayWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: clamp(3px, 2vw, 30px);
    row-gap: 4px;
    text-align: center;
    margin-bottom: 32px;
`;

export const DayButton = styled.button<{selected: boolean | null}>`
    width: 40px;
    height: 40px;
    margin: auto;
    border: none;
    border-radius: 10px;
    background: ${({selected}) => selected ? "#2B65FC" : "none"};
    color: ${({selected}) => selected ? "white" : "black"};
    font-size: 16px;
    text-align: center;
    padding: 8px;
    cursor: pointer;
    transition: all 0.1s ease-in-out 0s;
`;