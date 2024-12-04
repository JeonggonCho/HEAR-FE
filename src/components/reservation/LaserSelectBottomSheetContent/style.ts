import styled from "@emotion/styled";


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

export const CountOfLaserWrapper = styled.div<{lang: "ko" | "en" | "ch"}>`
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
    
    @media (max-width: 500px) {
        align-items: ${({lang}) => lang === "en" ? "start" : "center"};
        
        & > label:first-of-type {
            margin-top: ${({lang}) => lang === "en" ? "4px" : "0"};
        }
        
        & > div:first-of-type {
            flex-direction: ${({lang}) => lang === "en" ? "column" : "row"};
            align-items: ${({lang}) => lang === "en" ? "end" : "center"};
        }
    }
`;