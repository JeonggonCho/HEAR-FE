import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
`;

export const SideMenuBtnWrapper = styled.div`
    width: 28px;
    height: 28px;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }

    svg {
        width: 100%;
        height: 100%;
        fill: #B0B8C1;
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const MenusWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 12px 24px;
    position: sticky;
    top: 72px;
    background: ${({theme}) => theme.colors.bg.sub};
    z-index: 1;
    
    // 현재 문제 번호 및 제출 버튼
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        span {
            background-color: ${({theme}) => theme.colors.button.approval};
            padding: 8px 12px;
            border-radius: 6px;
            color: ${({theme}) => theme.colors.font.primary};
        }
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
`;

export const QuestionsWrapper = styled.div<{currentQuestion: number, scrollbarWidth: number}>`
    margin: 12px 24px 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    padding: 24px;
    border-radius: 12px;

    & > div:first-of-type {
        overflow: hidden;

        & > div:first-of-type {
            width: 100%;
            display: flex;
            gap: 120px;
            transition: all 0.5s ease-in-out 0s;
            transform: ${({currentQuestion}) => {
                return `translateX(-${currentQuestion * (500 + 120)}px)`;
            }};

            @media (max-width: 615px) {
                transform: ${({currentQuestion, scrollbarWidth}) => {
                    return `translateX(calc(-${currentQuestion} * (100vw - 100px + 120px - ${scrollbarWidth}px)))`;
                }};
            }
        }
    }
`;

export const BtnsWrapper = styled.div`
    margin: 0 24px;
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const SideMenuQuestionsWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    height: 80vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 20px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => theme.colors.font.placeholder};
        border: 7px solid ${({theme}) => theme.colors.bg.main};
        border-radius: 10px;
    }
`;

export const SideMenuQuestionWrapper = styled.li<{filled: string}>`
    cursor: pointer;
    border: 1px solid ${({theme, filled}) => {
        return filled === "true" ? theme.colors.line.primary : theme.colors.line.main;
    }};
    padding: 4px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    
    label {
        cursor: pointer;
        width: 28px;
        min-width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: ${({theme, filled}) => {
            return filled === "true" ? theme.colors.button.approval : theme.colors.button.third;
        }};
        border-radius: 4px;
        color: ${({theme, filled}) => {
            return filled === "true" ? theme.colors.font.primary : theme.colors.font.sub;
        }};
    }
`;

export const SideMenuAnswerWrapper = styled.div`
    width: 100%;
    display: flex;
    overflow: hidden;
    
    p {
        margin: 0;
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.main};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const AnswerWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    
    input[type="checkbox"],
    input[type="radio"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        margin: 0;
    }
`;

export const YearAndStudioWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 32px 0;
`;