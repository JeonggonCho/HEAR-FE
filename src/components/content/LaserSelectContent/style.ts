import styled from "@emotion/styled";

export const Container = styled.form`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    
    label {
        color: ${({theme}) => theme.colors.font.main};
    }
`;

export const CountOfLaserPerDayWrapper = styled.div<{count: number}>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px;
    overflow: hidden;

    & > span:first-of-type {
        display: inline-block;
        text-wrap: nowrap;
    }

    & > span:last-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -2px;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background-color: ${({theme, count}) => count > 0 ? theme.colors.button.approval : theme.colors.button.danger};
        color: ${({theme, count}) => count > 0 ? theme.colors.font.primary : theme.colors.font.danger};
        font-size: 1.15rem;
    }
`;

export const CountOfLaserPerWeekWrapper = styled.div<{count: number}>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px;
    overflow: hidden;

    & > span:first-of-type {
        display: inline-block;
        text-wrap: nowrap;
    }

    & > span:last-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -2px;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background-color: ${({theme, count}) => count > 0 ? theme.colors.button.approval : theme.colors.button.danger};
        color: ${({theme, count}) => count > 0 ? theme.colors.font.primary : theme.colors.font.danger};
        font-size: 1.15rem;
    }
`;

export const CountOfLaserWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: ${({theme}) => theme.colors.font.main};

    & > label:first-of-type {
        margin: 0 0 0 6px;
        font-size: 1rem;
        font-weight: 400;
        color: ${({theme}) => theme.colors.font.sub};
        line-height: 1.5;
    }

    & > div:first-of-type {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;