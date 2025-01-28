import styled from "@emotion/styled";
import hexToRgb from "@util/hexToRgb.ts";

export const Container = styled.div`
    width: 100%;
    display: grid;
    flex-direction: column;
    padding: 8px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;
`;

export const LabelAndMoreWrapper = styled.div<{isOpen: boolean, isCorrect: boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    cursor: pointer;
    
    // 문제 번호
    label {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({theme}) => theme.colors.button.third};
        border-radius: 4px;
        color: ${({theme}) => theme.colors.font.sub};
        cursor: pointer;
    }
    
    // O, X 표시
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-grow: 1;
        
        span {
            color: ${({theme}) => theme.colors.font.main};
        }
        
        svg {
            fill: ${({theme, isCorrect}) => isCorrect ? theme.colors.button.green : theme.colors.font.danger};
        }
    }
    
    // 더보기 화살표
    & > div:last-of-type {
        width: 28px;
        height: 28px;
        overflow: hidden;

        svg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            fill: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;
            transform: ${({isOpen}) => isOpen ? `rotate(180deg)` : null};
        }
    }
`;

export const SolutionWrapper = styled.div<{isOpen: boolean, maxHeight: string}>`
    max-height: ${({maxHeight, isOpen}) => isOpen ? maxHeight : "0"};
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;

    & > div:first-of-type {
        margin-top: 12px;
        padding: 24px 12px 16px;
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }
`;

export const QuestionWrapper = styled.div`
    display: flex;
    gap: 8px;

    & > span {
        font-size: 1.15rem;
        color: ${({theme}) => theme.colors.font.main};
    }

    & > p {
        width: 100%;
        margin: 0;
        text-wrap: wrap;
        word-break: break-all;
        line-height: 1.5;
        color: ${({theme}) => theme.colors.font.main};
    }
`;

export const ExplanationWrapper = styled.p`
    margin: 16px 0 24px 24px;
    color: ${({theme}) => theme.colors.font.sub};
`;

export const AnswersWrapper = styled.div`
    margin-top: 24px;
    font-size: 1.05rem;
    
    ul {
        margin: 0;
        padding: 0;
        gap: 12px;
    }
`;

export const ShortAnswerWrapper = styled.div`
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.line.main};
`;

export const ShortAnswer = styled.p`
    margin: 0 0 12px;
    text-wrap: wrap;
    word-break: break-all;
    line-height: 1.3;
`;

export const MyAnswer = styled.p<{isCorrect: boolean}>`
    color: ${({theme, isCorrect}) => isCorrect ? theme.colors.button.green : theme.colors.font.danger};
    text-wrap: wrap;
    word-break: break-all;
    line-height: 1.3;
    margin: 0;
`;

export const OptionListItemWrapper = styled.li<{isAnswer: boolean, isChecked: boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid ${({theme, isAnswer}) => isAnswer ? theme.colors.button.green : theme.colors.line.main};
    background-color: ${({ theme, isAnswer }) => {
        return isAnswer ? `rgba(${hexToRgb(theme.colors.button.green)}, 0.05)` : theme.colors.bg.main;
    }};
    color: ${({theme, isAnswer}) => isAnswer ? theme.colors.font.main : theme.colors.font.sub};
    border-radius: 8px;

    & > p {
        margin: 0;
        text-wrap: wrap;
        word-break: break-all;
        line-height: 1.3;
    }
    
    & > div:last-of-type {
        min-width: 24px;
        overflow: hidden;
        
        svg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            visibility: ${({isChecked}) => {
                return !isChecked ? "hidden" : "visible";
            }};
            fill: ${({theme, isChecked, isAnswer}) => {
                return isAnswer && isChecked ? theme.colors.button.green : isChecked ? theme.colors.font.danger : null;
            }};
        }
    }
`;