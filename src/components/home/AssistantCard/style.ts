import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    transition: all 0.2s ease-in-out 0s;
`;

export const AssistantCardTitleWrapper = styled.div<{valid: boolean}>`
    display: flex;
    align-items: center;
    gap: 12px;
    
    & > h3 {
        margin: 0;
        font-weight: 500;
        text-wrap: wrap;
        word-break: keep-all;
        line-height: 1.3;
        color: ${({valid, theme}) => valid ? theme.colors.font.main : theme.colors.font.placeholder};
    }

    img {
        width: 28px;
        filter: ${({valid}) => valid ? "grayscale(0)" : "grayscale(1)"};
        opacity: ${({valid}) => valid ? "1" : "0.5"};
    }
`;

export const AssistantInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    
    & > div:first-of-type {
        display: flex;
        align-items: end;
        gap: 8px;

        span {
            margin-bottom: 4px;
            color: ${({theme}) => theme.colors.font.main};
        }

        & > span:last-of-type {
            font-size: 0.9rem;
            color: ${({theme}) => theme.colors.font.sub};
            margin-bottom: 5px;
        }
    }
`;

export const EmptyAssistantInfo = styled.div`
    color: ${({theme}) => theme.colors.font.placeholder};
`;