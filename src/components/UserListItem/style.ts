import styled from "@emotion/styled";

export const Container = styled.div<{passQuiz: boolean}>`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        border: 1px solid ${({theme}) => theme.colors.line.primary};
    }

    span {
        text-align: center;
        line-height: 1.2;
    }
    
    & > span:first-of-type {
        width: 20%;
    }

    & > span:nth-of-type(2) {
        width: 15%;
    }

    & > span:nth-of-type(3) {
        width: 35%;
    }

    & > span:nth-of-type(4) {
        width: 15%;
    }

    & > div:first-of-type {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        span {
            padding: 6px 12px;
            border-radius: 6px;
            color: ${({passQuiz, theme}) => passQuiz ? theme.colors.font.primary : theme.colors.font.danger};
            background-color: ${({passQuiz, theme}) => passQuiz ? theme.colors.button.approval : theme.colors.button.danger};
        }
    }
    
    & + & {
        margin-top: 8px;
    }
`;