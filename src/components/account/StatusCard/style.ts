import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 16px;

    & > div:first-of-type, & > div:last-of-type {
        text-align: center;
        width: 100%;
        line-height: 1.2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;

        p {
            margin: 0 0 -2px;
            font-size: 1rem;
        }

        span {
            font-size: 0.75rem;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }

    & > div:nth-of-type(2) {
        min-height: 60px;
        border-left: 1px solid ${({theme}) => theme.colors.font.placeholder};
    }
`;

export const PassStatus = styled.h3<{pass: boolean}>`
    font-size: 1.15rem;
    font-weight: 500;
    margin: 0;
    color: ${({theme, pass}) => pass ? theme.colors.font.primary : theme.colors.font.danger};
`;

export const WarningStatus = styled.h3<{warning: number}>`
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
    color: ${({theme, warning}) => warning === 0 ? theme.colors.font.primary : warning === 1 ? theme.colors.font.main : theme.colors.font.danger};
`;