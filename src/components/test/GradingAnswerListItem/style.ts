import styled from "@emotion/styled";
import hexToRgb from "@util/hexToRgb.ts";

export const Container = styled.div<{isOpen: boolean, maxHeight: string}>`
    width: 100%;
    display: flex;
    flex-direction: column;

    & > div:first-of-type {
        max-height: ${({maxHeight, isOpen}) => isOpen ? maxHeight : "0"};
        transition: max-height 0.3s ease-in-out;
        overflow: hidden;

        & > div:first-of-type {
            margin: 8px 0 24px 0;
        }
    }
    
    // 보기 버튼 영역
    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover {
            span {
                color: ${({theme}) => theme.colors.font.main};
            }
            
            svg {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }
        
        span {
            font-size: 0.9rem;
            margin-left: 12px;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;
        }
        
        svg {
            width: 28px;
            height: 28px;
            fill: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;
            transform: ${({isOpen}) => isOpen ? `rotate(180deg)` : null};
        }
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
    margin: 16px 0 8px 24px;
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

export const ShortAnswer = styled.p`
    margin: 12px 0;
    text-wrap: wrap;
    word-break: break-all;
    line-height: 1.3;
`;

export const MyAnswer = styled.p<{isCorrect: boolean}>`
    color: ${({theme, isCorrect}) => isCorrect ? theme.colors.button.green : theme.colors.font.danger};
    text-wrap: wrap;
    word-break: break-all;
    line-height: 1.3;
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
    color: ${({theme, isAnswer}) => isAnswer ? theme.colors.button.green : theme.colors.font.main};
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