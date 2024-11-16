import styled from "@emotion/styled";

export const ResultWrapper = styled.div`
    margin: 24px;
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

export const ResultCard = styled.div`
    width: 100%;
    padding: 24px;
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
            font-size: 1.15rem;
            font-weight: 500;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        p {
            font-size: 1.5rem;
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
    margin-left: 8px;
    margin-top: -2px;
    
    & > span {
        font-size: 1.2rem;
    }
    
    svg {
        width: 28px;
        height: 28px;
        fill: ${({theme, pass}) => pass === "true" ? theme.colors.button.green : theme.colors.font.danger};
    }
`;

export const QuestionsWrapper = styled.div`
    & > label {
        margin-left: 8px;
        color: ${({theme}) => theme.colors.font.sub};
        font-size: 1.15rem;
        font-weight: 500;
        margin-bottom: 36px;
    }
    
    ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

export const QuestionWrapper = styled.li<{pass: "true" | "false"}>`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;

    & > span:first-of-type {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({theme}) => theme.colors.button.third};
        border-radius: 4px;
        font-size: 1.2rem;
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