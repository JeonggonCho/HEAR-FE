import styled from "@emotion/styled";

export const ResultWrapper = styled.div`
    margin: 24px;
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

export const ResultCard = styled.div`
    width: 100%;
    padding: 16px 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;
    display: grid;
    grid-template-columns: 1fr 0 1fr;
    grid-gap: 24px;
    
    // 채점, 결과
    & > div:first-of-type, 
    & > div:last-of-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        
        label {
            font-size: 1.05rem;
            font-weight: 500;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        p {
            font-size: 1.25rem;
            margin: 0;
            
            & > span:last-of-type {
                color: ${({theme}) => theme.colors.font.sub};
            }
        }
    }
    
    // 세로라인
    & > div:nth-of-type(2) {
        border-left: 1px solid ${({theme}) => theme.colors.line.main};
    }
`;

export const ResultSignWrapper = styled.div<{pass: "true" | "false"}>`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 12px;
    margin-top: -2px;
    
    & > span {
        font-size: 1.05rem;
    }
    
    svg {
        width: 28px;
        height: 28px;
        fill: ${({theme, pass}) => pass === "true" ? theme.colors.button.green : theme.colors.font.danger};
    }
`;

export const QuestionsWrapper = styled.div`
    & > label {
        display: inline-block;
        margin-left: 8px;
        color: ${({theme}) => theme.colors.font.sub};
        font-size: 1.05rem;
        font-weight: 500;
        margin-bottom: 12px;
    }
    
    ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

export const QuestionListWrapper = styled.li<{pass: "true" | "false"}>`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 8px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;

    & > span:first-of-type {
        min-width: 32px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({theme}) => theme.colors.button.third};
        color: ${({theme}) => theme.colors.font.sub};
        border-radius: 4px;
    }
    
    & > div:last-of-type {
        padding: 0 4px 0 12px;
        display: flex;
        align-items: center;
        border-left: 1px solid ${({theme}) => theme.colors.line.main};
        
        svg {
            fill: ${({theme, pass}) => pass === "true" ? theme.colors.button.green : theme.colors.font.danger};
        }
    }
`;